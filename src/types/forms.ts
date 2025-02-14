import { HTMLInputTypeAttribute, HTMLProps } from "react"
import { CollectionNames } from "."
import { IAPIResponse } from "./api"
import { MediaRole } from "./media"


export type FormByCollectionName = {
    action: { 
        [key in ActionTarget]: IFormAction
    },
    fields: {
        [key in CollectionNames]: FormField[] 
    }
}

export type ActionTarget = 'creation' | 'update' | 'delete' //| 'addMedia' | 'updateMedia' | 'deleteMedia' | 'updateManager'

export type FormField = {
    name: string,
    label: string,
    instructions: string | null,
    type: HTMLInputTypeAttribute,
    validationMethod: ((value: string, valueToTestAgainst: string | null) => boolean) | null,
    processingMethod: ((value: string) => string) | null,
    testAgainst: string | null,
    element: (props: HTMLProps<HTMLInputElement & HTMLSelectElement & HTMLTextAreaElement>) => JSX.Element,
    required: boolean,
    media?: {
        role: MediaRole,
        accept: string,
        previewClassname?: React.ComponentProps<'div'>['className'];
    },
    options?: { name: string, value: string }[],
    readonly?: boolean
}

export type IFormAction = (...args: any) => Promise<IAPIResponse<any>>

export type IFormEditionAction = (collection: CollectionNames, id: string, prevState: any, formData: FormData) => Promise<IAPIResponse<any>>

export type IAssociationAction = (collection: CollectionNames, collectionItemId: string | number, association: AssociationNames, prevState: any, formData: FormData) => Promise<IAPIResponse<any>>

export type IDissociationAction = (collection: CollectionNames, collectionItemId: string | number, association: IAssociationNames, associationId: string | number, prevState: any, formData: FormData) => Promise<IAPIResponse<any>>
