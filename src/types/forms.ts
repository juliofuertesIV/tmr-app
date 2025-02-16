import { HTMLInputTypeAttribute, HTMLProps } from "react"
import { CollectionNames } from "."
import { IAPIResponse } from "./api"
import { MediaRole } from "./media"
import { AssociationNames } from "./associations"


export type FormByCollectionName = {
    action: { 
        [key in ActionTarget]: FormAction
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

export type FormAction = (...args: any) => Promise<IAPIResponse<any>>

export type FormEditionAction = (collection: CollectionNames, id: string, prevState: any, formData: FormData) => Promise<IAPIResponse<any>>

export type AssociationAction = (collection: CollectionNames, collectionItemId: string | number, association: AssociationNames, prevState: any, formData: FormData) => Promise<IAPIResponse<any>>

export type DissociationAction = (collection: CollectionNames, collectionItemId: string | number, association: AssociationNames, associationId: string | number, prevState: any, formData: FormData) => Promise<IAPIResponse<any>>
