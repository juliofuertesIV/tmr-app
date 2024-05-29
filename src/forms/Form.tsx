'use client'

import { useFormState } from 'react-dom'
import { IFormAction, IFormField, formInitialState } from '@/types/forms'
import { IOneOfCollectionNames, IOneOfCollections } from '@/types'
import AdminFormFeedback from './feedback/FormFeedback'
import FormInput from './inputs/FormInput'
import FormSubmit from '@/forms/feedback/FormSubmit'

type Props = {
    action: IFormAction,
    fields: IFormField[],
    collection: IOneOfCollectionNames,
    collectionItem?: IOneOfCollections
}

export default function Form({ action, fields, collection, collectionItem } : Props) {

    const boundAction = action.bind(null, collection)

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
            <FormSubmit/>
        </form>
    )
}
