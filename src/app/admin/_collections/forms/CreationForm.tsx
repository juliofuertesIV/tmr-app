'use client'

import { useFormState } from 'react-dom'
import FormSubmit from './FormSubmit'
import { IFormCreationAction, ICreationFormField, formInitialState } from '@/interfaces/forms'
import AdminFormFeedback from './FormFeedback'
import { useEffect } from 'react'
import { IOneOfCollectionNames } from '@/interfaces'
import CreationInput from './inputs/CreationInput'

type Props = {
    action: IFormCreationAction,
    fields: ICreationFormField[],
    collection: IOneOfCollectionNames
}

export default function CreationForm({ action, fields, collection } : Props) {

    const boundAction = action.bind(null, collection)

    const [state, formAction] = useFormState(boundAction, formInitialState)

    useEffect(() => {
        
    }, [ state ])


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