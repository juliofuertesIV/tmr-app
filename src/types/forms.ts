import { IContestMediaRole, IOneOfCollectionNames } from "."
import { IAPIResponse } from "./api"
import { IAssociationNames } from "./associations"

export const formInitialState : IAPIResponse<any> = {
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

export type IFormCreationAction = (collection: IOneOfCollectionNames, prevState: any, formData: FormData) => Promise<IAPIResponse<any>>
// TO DO: unify through modes 'create' | 'edit' ? 

export type IFormAction = (...args: any) => Promise<IAPIResponse<any>>

export type IFormEditionAction = (collection: IOneOfCollectionNames, id: string, prevState: any, formData: FormData) => Promise<IAPIResponse<any>>

export type IAssociationAction = (collection: IOneOfCollectionNames, collectionItemId: string | number, association: IAssociationNames, prevState: any, formData: FormData) => Promise<IAPIResponse<any>>

export type IDissociationAction = (collection: IOneOfCollectionNames, collectionItemId: string | number, association: IAssociationNames, associationId: string | number, prevState: any, formData: FormData) => Promise<IAPIResponse<any>>