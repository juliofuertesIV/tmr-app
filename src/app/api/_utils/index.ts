import { IAPIResponse } from "@/interfaces/api"
import { parseError } from "./errors"

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