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
    MediumId?: string,
    domain?: string,
    target: IActionTarget,
    children?: ReactNode
}

export default function Form({ 
    action,
    fields,
    collection,
    collectionItem,
    MediumId,
    target,
    children 
} : Props) {

    if (target === 'update' && !collectionItem) throw new Error('Cannot update a missing item.')

    let boundAction;

    if (target == 'update') boundAction = action.bind(null, collection, (collectionItem as IAllCollections).id)
    if (target == 'addMedia') boundAction = action.bind(null, collection, (collectionItem as IAllCollections).id)
    if (target == 'updateMedia') boundAction = action.bind(null, collection, (collectionItem as IAllCollections).id, MediumId)
    if (target == 'deleteMedia') boundAction = action.bind(null, collection, MediumId as string)
    if (target == 'creation') boundAction = action.bind(null, collection)

    if (!boundAction) throw new Error('Action not found.')

    const [state, formAction] = useFormState(boundAction, formInitialState)

    return (
        <form 
            className="flex flex-col gap-2 w-full max-w-xl"
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
