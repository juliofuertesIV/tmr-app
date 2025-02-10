import { constructAPIResponse, getManagerInCookies } from "@/app/api/_functions"
import { Log } from '@/database/models'
import { ICollectionNames } from "@/types"
import { IAPIError, IErrorTypes } from "@/types/api"
import { NextRequest } from "next/server"
import { ConnectionRefusedError, ValidationError } from "sequelize"

export const parseError = (error: unknown) : IAPIError => {

    if (!error) return null

    if (error instanceof ValidationError) 
        return { 
            errorType: "validation" as IErrorTypes,
            message: error.message,
            cause: error.cause as string || undefined,
            messages: error.errors.map(err => err.message)
        }

    if (error instanceof ConnectionRefusedError) {
        return { 
            errorType: "connection" as IErrorTypes,
            message: 'Error conectando con la base de datos',
            cause: error.cause as string || undefined,
            messages: []
        }
    }

    if (error instanceof Error) 
        return {
            errorType: "regular" as IErrorTypes,
            message: error.message,
            cause: error.cause as string || undefined,
            messages: [error.message]
        }

    else {
        return {
            errorType: "regular" as IErrorTypes, 
            message: 'Error desconocido',
            cause: 'Causa desconocida',
            messages: ['Error desconocido.'],
        }
    }
}

export const createLog = async ({
    error,
    route,
    collection,
    type = 'error',
    ManagerId 
} : {
    error: unknown,
    route: string,
    collection?: ICollectionNames | null,
    type?: string,
    ManagerId: string | null
}) => {
    
    const log = {
        type, 
        message: error instanceof Error ? error.message : 'Error desconocido',
        ManagerId,
        route,
        collection
    }

    await Log.create({ ...log })
    .then(data => data)
    .catch(error => error)  
}
 
export const handleApiError = async ({
    error,
    route,
    message,
    collection,
    req
} : {
    error: unknown,
    route: string,
    message?: string,
    collection?: ICollectionNames,
    req: NextRequest
}) => {

    let manager, blame;

    if (req) {
        manager = await getManagerInCookies(req)
    }

    if (manager) {
        blame = manager.id
    }

    await createLog({ error, collection, route, type: 'error', ManagerId: manager?.id || null })

    return Response.json(
        constructAPIResponse({ 
            message: message || 'Error desconocido.',
            success: false,
            error,
            data: null 
        })
    )
}
