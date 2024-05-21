import { Manager, Role } from "@/database"
import { generateUserToken, passwordsAreMatching } from "../_utils"
import { NextRequest } from "next/server"
import { IManager } from "@/types"
import { constructAPIResponse } from "../../_utils"


export const POST = async (request: NextRequest) => {

    const { email, password } = Object.fromEntries(await request.formData()) as { email: string, password: string }

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

    const refreshedToken = generateUserToken()

    try {    

        await Manager.update({ token: refreshedToken }, { where: { id: manager.id }})

        const data = { email, authToken: manager.token, name: manager.name, id: manager.id, Role: manager.Role }

        return Response.json(
            constructAPIResponse({
                message: 'Login correcto',
                success: true,
                data,
                error: null
            })
        )

    }
    catch (error) {

        return Response.json(
            constructAPIResponse({
                message: 'Error actualizando el token de seguridad.',
                error: new Error('Error actualizando el token de seguridad.'),
                data: null,
                success: false
            })
        )
    }
}
