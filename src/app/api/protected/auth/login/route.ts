import { Log, Manager, Role } from '@/database/models'
import { createSession, passwordsAreMatching } from "@/lib/auth"
import { NextRequest } from "next/server"
import { IManager } from "@/types"
import { constructAPIResponse } from "../../../_utils"
import { handleApiError } from "@/lib/errors"

export const POST = async (request: NextRequest) => {

    const formData = await request.formData()
    const { email, password } = Object.fromEntries(formData) as { email: string, password: string }

    const manager = await Manager.findOne({ 
        where: { email }, 
        attributes: ['id', 'email', 'name', 'hash', 'salt' ], 
        include: [ Role ]
    })
    .then(data => data)
    .catch(error => {
        return Response.json(
            constructAPIResponse({
                message: 'Error buscando al manager en la base de datos.',
                error,
                data: null,
                success: false
            })
        )
    }) as unknown as IManager

    if (!manager) {
        return Response.json(
            constructAPIResponse({
                message: 'Not found!',
                error: new Error('No se encuentra un manager con ese email.'),
                data: null,
                success: false
            })
        )        
    }

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

        await Log.create({
            type: 'login',
            message: `Sesión creada para ${ manager.name }`,
            route: '/api/login'
        })

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
        return await handleApiError({
            message: 'Error generando sesión.',
            error, 
            route: `/api/login`
        })
    }
}
