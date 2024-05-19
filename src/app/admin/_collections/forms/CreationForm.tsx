'use client'

import { useFormState } from 'react-dom'
import FormSubmit from './FormSubmit'
import { IFormAction, IFormField, formInitialState } from '@/types/forms'
import AdminFormFeedback from './FormFeedback'
import { IOneOfCollectionNames } from '@/types'
import CreationInput from './inputs/CreationInput'

type Props = {
    action: IFormAction,
    fields: IFormField[],
    collection: IOneOfCollectionNames
}

export default function CreationForm({ action, fields, collection } : Props) {

    const boundAction = action.bind(null, collection)

    const [state, formAction] = useFormState(boundAction, formInitialState)

    return (
        <form 
            className="flex flex-col gap-2 w-full"
            action={ formAction }
        >
            <AdminFormFeedback state={ state } />
            {
                fields.map((input, index) => <CreationInput key={ index } input={ input } />)
            }
            <FormSubmit/>
        </form>
    )
}
