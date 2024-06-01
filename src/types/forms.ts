import { HTMLInputTypeAttribute } from "react"
import { IOneOfCollectionNames } from "."
import { IAPIResponse } from "./api"
import { IAssociationNames } from "./associations"
import { IMediaRole } from "./media"


export type IFormByCollectionName = {
    action: { 
        [key in IActionTarget]: IFormAction
    },
    fields: {
        [key in IOneOfCollectionNames]: IFormField[] 
    }
}

export type IActionTarget = 'creation' | 'update'

export type IFormField = {
    name: string,
    label: string,
    type: HTMLInputTypeAttribute,
    validationMethod: ((value: string, valueToTestAgainst: string | null) => boolean) | null,
    processingMethod: ((value: string) => string) | null,
    testAgainst: string | null,
    requiredForItemCreation: boolean,
    options?: { name: string, value: string }[],
}

export type IMediaFormField = {
    role: IMediaRole,
    label: string,
    type: 'image' | 'pdf'
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
