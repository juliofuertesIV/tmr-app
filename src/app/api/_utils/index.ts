import { IAPIResponse, IErrorTypes } from "@/interfaces/forms"
import { ValidationError } from "sequelize"

export const constructAPIResponse = ({ 
    message,
    success,
    error: apiError,
    data
} : { 
    message: string,
    success: boolean,
    error: unknown | null,
    data: any | null
}) : IAPIResponse => {

    const error = parseError(apiError)

    return {
        message,
        success,
        error,
        data
    }
}

const parseError = (error: unknown) => {

    if (!error) return null

    if (error instanceof ValidationError) 
        return { 
            errorType: "validation" as IErrorTypes,
            content: error,
            messages: error.errors.map(err => err.message)
        }

    if (error instanceof Error) 
        return {
            errorType: "regular" as IErrorTypes,
            content: error,
            messages: [error.message]
        }

    else {
        return {
            errorType: "regular" as IErrorTypes, 
            messages: ['Error desconocido.'],
            content: new Error('Error desconocido.')
        }
    }
}
