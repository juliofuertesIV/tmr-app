import { ICollectionNames } from "."

export type ILogTypes = 'error' | 'login'

export type ILog = {
    id?: string,
    type: string,
    message: string,
    errorCause?: string,
    digest?: number,
    route: string,
    collection?: ICollectionNames,
    blame: string,
    createdAt: Date,
}
