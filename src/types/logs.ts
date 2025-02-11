import { CollectionNames } from "."

export type ILogTypes = 'error' | 'login'

export type ILog = {
    id?: string,
    type: string,
    message: string,
    errorCause?: string,
    digest?: number,
    route: string,
    collection?: CollectionNames,
    blame: string,
    createdAt: Date,
}
