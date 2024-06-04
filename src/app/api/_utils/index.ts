import { parseError } from "@/errors"
import { IAPIResponse } from "@/types/api"

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
}) : IAPIResponse<typeof data> => {

    const error = parseError(apiError)

    return {
        message,
        success,
        error,
        data
    }
}