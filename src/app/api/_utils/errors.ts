import { IErrorTypes } from "@/interfaces/api"
import { ValidationError } from "sequelize"


export const parseError = (error: unknown) => {

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
            content: new Error('Error desconocido.'),
            messages: ['Error desconocido.'],
        }
    }
}
