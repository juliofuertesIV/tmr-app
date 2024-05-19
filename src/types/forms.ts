import { IContestMediaRole, IOneOfCollectionNames } from "."
import { IAPIResponse } from "./api"
import { IAssociationNames } from "./associations"

export type IActionTarget = 'creation' | 'update'

export type IFormField = {
    name: string,
    label: string,
    required: boolean,
    type: string
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

<<<<<<< HEAD
export type IDissociationAction = (collection: IOneOfCollectionNames, collectionItemId: string | number, association: IAssociationTypes, associationId: string | number, prevState: any, formData: FormData) => Promise<IAPIResponse<any>>

export const formInitialState : IAPIResponse<any> = {
    success: false,
    message: '',
    error: null,
    data: null
} 
=======
export type IDissociationAction = (collection: IOneOfCollectionNames, collectionItemId: string | number, association: IAssociationNames, associationId: string | number, prevState: any, formData: FormData) => Promise<IAPIResponse<any>>
>>>>>>> 8f627ef6f2c48fb707377594b58a9254763e36a6
