import { IAPIError, IErrorTypes } from "@/types/api"
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
