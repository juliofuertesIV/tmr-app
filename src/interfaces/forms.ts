import { ValidationError, ValidationErrorItem } from "sequelize"
import { IContestMediaRole, IOneOfCollectionNames } from "."

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

export type IMediaFormField = {
    mediaType: IContestMediaRole | 'inscription',
    label: string,
    small: string,
    acceptedTypes: string[]
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
