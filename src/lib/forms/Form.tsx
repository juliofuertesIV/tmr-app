'use client'

import { useFormState } from 'react-dom'
import { IActionTarget, IFormAction, IFormField } from '@/types/forms'
import { ICollectionNames, IAllCollections } from '@/types'
import AdminFormFeedback from './feedback/FormFeedback'
import FormInput from './inputs/FormInput'
import FormSubmit from '@/lib/forms/feedback/FormSubmit'
import { ReactNode } from 'react'
import { formInitialState } from './feedback/state'

type Props = {
    action: IFormAction,
    fields?: IFormField[],
    collection: ICollectionNames,
    collectionItem?: IAllCollections,
    domain?: string,
    target?: IActionTarget,
    children?: ReactNode
}

export default function Form({ 
    action,
    fields,
    collection,
    collectionItem,
    target,
    children 
} : Props) {

    if (target === 'update' && !collectionItem) throw new Error('Cannot update a missing item.')
 
    const boundAction = target === 'update' ? 
        action.bind(null, collection, (collectionItem as IAllCollections).id) 
        : action.bind(null, collection)

    const [state, formAction] = useFormState(boundAction, formInitialState)

    return (
        <form 
            className="flex flex-col gap-2 w-full"
            action={ formAction }
        >
            <AdminFormFeedback state={ state } />
            { 
                fields?.map((field, index) => 
                    <FormInput key={ index } field={ field } collectionItem={ collectionItem }/>) 
            }
            { children }
            <FormSubmit/>
        </form>
    )
}
