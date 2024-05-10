import { IContestMediaRole, IOneOfCollectionNames } from "."
import { IAPIResponse } from "./api"

export const formInitialState : IAPIResponse = {
    success: false,
    message: '',
    error: null,
    data: null
} 

export type ICreationFormField = {
    name: string,
    label: string,
    required: boolean,
    type: string,
    defaultValue?: string
}

export type IEditionFormField = {
    name: string,
    label: string,
    required: boolean,
    type: string
}

export type ICollectionFormField = {
    name: string,
    label: string,
    type: string,
    required: boolean,
    instructions?: string
}

export type IMediaFormField = {
    role: IContestMediaRole,
    label: string,
    width?: number,
    height?: number,
    instructions: string,
    acceptedTypes: string,
    multiple: boolean
}

export type IFormCreationAction = (collection: IOneOfCollectionNames, prevState: any, formData: FormData) => Promise<IAPIResponse>
// TO DO: unify through modes 'create' | 'edit' ? 

export type IFormEditionAction = (collection: IOneOfCollectionNames, id: string, prevState: any, formData: FormData) => Promise<IAPIResponse>

export type ICreationFormByCollectionName = {
    fields: ICreationFormField[],
    action: IFormCreationAction
}

export type IEditionFormByCollectionName = {
    fields: IEditionFormField[],
    mediaFields: IMediaFormField[],
    action: IFormEditionAction
}