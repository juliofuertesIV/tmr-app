'use client'

import { useFormState } from 'react-dom'
import { IActionTarget, IFormAction, IFormField, IMediaFormField } from '@/types/forms'
import { ICollectionNames, IAllCollections } from '@/types'
import AdminFormFeedback from './feedback/FormFeedback'
import FormInput from './inputs/FormInput'
import FormSubmit from '@/forms/feedback/FormSubmit'
import { ReactNode } from 'react'
import { formInitialState } from './feedback/state'
import MediaInput from './inputs/by_type/MediaInput'

type Props = {
    action: IFormAction,
    fields: IFormField[],
    mediaFields?: IMediaFormField[],
    collection: ICollectionNames,
    collectionItem?: IAllCollections,
    domain?: string,
    target?: IActionTarget,
    children?: ReactNode
}

export default function Form({ 
    action,
    fields,
    mediaFields,
    collection,
    collectionItem,
    target,
    domain,
    children 
} : Props) {

    const boundAction = target === 'update' && !!collectionItem ? 
        action.bind(null, collection, collectionItem.id) : action.bind(null, collection)

    const [state, formAction] = useFormState(boundAction, formInitialState)

    return (
        <form 
            className="flex flex-col gap-2 w-full"
            action={ formAction }
        >
            <AdminFormFeedback state={ state } />
            { 
                fields.map((field, index) => 
                    <FormInput key={ index } field={ field } collectionItem={ collectionItem } />) 
            }
            { 
                mediaFields?.map((field, index) => 
                    <MediaInput key={ index } field={ field } domain={ domain || 'no-domain' }/>)
            }
            { children }
            <FormSubmit/>
        </form>
    )
}
