
import { Log, Manager, Role } from '@/database/models'
import { createSession, passwordsAreMatching } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"
import { IManager } from "@/types"
import { constructAPIResponse } from "../_functions"
import { handleApiError } from "@/lib/errors"

export const POST = async (req: NextRequest) => {

    const formData = await req.formData()
    const { email, password } = Object.fromEntries(formData) as { email: string, password: string }

    let manager;

    try { manager = await findManagerByEmail(email) }
    catch (error) {
        return handleApiError({
            req,
            error: new Error('No se ha encontrado un manager con ese email.'),
            route: '/api/login'            
        })
    }

    if (!passwordsAreMatching({ hash: manager.hash, salt: manager.salt, inputPassword: password })) { 
        return Response.json(
            constructAPIResponse({
                message: 'No se pudo validar la contraseña.',
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

        const response = NextResponse.json(
            constructAPIResponse({
                message: 'Sesión generada correctamente.',
                error: null,
                data: session,
                success: true
            })
        )
        
        return response
    }
    catch (error) {
        return await handleApiError({
            req,
            message: 'Error generando sesión.',
            error, 
            route: `/api/login`
        })
    }
}

const findManagerByEmail = async (email: string) => {
    const manager = await Manager.findOne({ 
        where: { email }, 
        attributes: ['id', 'email', 'name', 'hash', 'salt' ], 
        include: [ Role ]
    })
    .then(data => data) 
    .catch(error => { throw new Error('Error buscando al manager en la base de datos.') }) as unknown as IManager
   
    return manager
}