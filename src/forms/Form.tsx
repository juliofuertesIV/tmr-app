'use client'

import { useFormState } from 'react-dom'
import { IFormAction, IFormField } from '@/types/forms'
import { ICollectionNames, IAllCollections } from '@/types'
import AdminFormFeedback from './feedback/FormFeedback'
import FormInput from './inputs/FormInput'
import FormSubmit from '@/forms/feedback/FormSubmit'
import { ReactNode } from 'react'
import { formInitialState } from './feedback/state'

type Props = {
    action: IFormAction,
    fields: IFormField[],
    collection: ICollectionNames,
    collectionItem?: IAllCollections,
    children?: ReactNode
}

export default function Form({ action, fields, collection, collectionItem, children } : Props) {

    // TO DO: on creation we don't need to bind ID, on update we do (refactor this mess)
    const boundAction = !!collectionItem ? action.bind(null, collection, collectionItem.id) : action.bind(null, collection)

    const [state, formAction] = useFormState(boundAction, formInitialState)

    return (
        <form 
            className="flex flex-col gap-2 w-full"
            action={ formAction }
        >
            <AdminFormFeedback state={ state } />
            {
                fields.map((field, index) => 
                    <FormInput key={ index } field={ field } collectionItem={ collectionItem } />
                )
            }
            { children }
            <FormSubmit/>
        </form>
    )
}
