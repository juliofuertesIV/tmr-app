import { IContestMediaRole, IOneOfCollectionNames } from "."
import { IAPIResponse } from "./api"
import { IAssociationNames } from "./associations"


export type IFormByCollectionName = {
    action: { 
        [key in IActionTarget]: IFormAction
    },
    fields: {
        [key in IOneOfCollectionNames]: {
           [key in IActionTarget]: IFormField[] 
        }
    }
}

export type IActionTarget = 'creation' | 'update'

export type IFormField = {
    name: string,
    label: string,
    required: boolean,
    type: string,
    options?: { name: string, value: string }[]
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

export type IFormAction = (...args: any) => Promise<IAPIResponse<any>>

export type IFormEditionAction = (collection: IOneOfCollectionNames, id: string, prevState: any, formData: FormData) => Promise<IAPIResponse<any>>

export type IAssociationAction = (collection: IOneOfCollectionNames, collectionItemId: string | number, association: IAssociationNames, prevState: any, formData: FormData) => Promise<IAPIResponse<any>>

export type IDissociationAction = (collection: IOneOfCollectionNames, collectionItemId: string | number, association: IAssociationNames, associationId: string | number, prevState: any, formData: FormData) => Promise<IAPIResponse<any>>

export const formInitialState : IAPIResponse<any> = {
    success: false,
    message: '',
    error: null,
    data: null
} 
