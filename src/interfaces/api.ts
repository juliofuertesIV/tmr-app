
export type IErrorTypes = 'validation' | 'regular' 

export type IAPIResponse = {
    message: string,
    success: boolean,
    error: {
        errorType: IErrorTypes,
        content: Error,
        messages: string[]
    } | null,
    data: any | null
}
