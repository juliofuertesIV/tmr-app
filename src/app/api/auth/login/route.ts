import { Manager, Role } from "@/database"
import { createSession, passwordsAreMatching } from "@/auth"
import { NextRequest } from "next/server"
import { IManager } from "@/types"
import { constructAPIResponse } from "../../_utils"

export const POST = async (request: NextRequest) => {

    const formData = await request.formData()
    const { email, password } = Object.fromEntries(formData) as { email: string, password: string }

    const manager = await Manager.findOne({ 
        where: { email }, 
        attributes: ['id', 'email', 'token', 'name', 'hash', 'salt' ], 
        include: [ Role ]
    })
    .then(data => data)
    .catch(error => {
        return Response.json(
            constructAPIResponse({
                message: 'No se encuentra un manager con ese email.',
                error,
                data: null,
                success: false
            })
        )
    }) as unknown as IManager
        
    if (!passwordsAreMatching({ hash: manager.hash, salt: manager.salt, inputPassword: password })) { 
        return Response.json(
            constructAPIResponse({
                message: 'Error validando la contraseña.',
                error: new Error('La contraseña no es correcta.'),
                data: null,
                success: false
            })
        )
    }

    try {
        const { session, expires } = await createSession({ manager })

        return Response.json(
            constructAPIResponse({
                message: 'Logged in.',
                error: null,
                data: { session, expires },
                success: true
            })
        )
    }
    catch (error) {
        console.log({ error })
        return Response.json(
            constructAPIResponse({
                message: 'Error generando sesión.',
                error,
                data: null,
                success: false
            })
        )
    }
}
