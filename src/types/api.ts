
export type IErrorTypes = 'validation' | 'aggregate' | 'regular' 

export type IAPIError = {
    errorType: IErrorTypes,
    message: string,
    cause?: string,
    messages?: string[]
} | null

export type IAPIResponse = {
    message: string,
    success: boolean,
    error: IAPIError,
    data: any | null
}
