'use client'

import { useFormState } from 'react-dom'
import AdminFormSubmit from './AdminFormSubmit'
import { IAPIResponse, IFormCreationAction, ICreationFormField } from '@/interfaces/forms'
import AdminFormFeedback from './AdminFormFeedback'
import { useEffect } from 'react'
import { IOneOfCollectionNames } from '@/interfaces'
import CreationInput from './inputs/CreationInput'

const initialState : IAPIResponse = {
    success: false,
    message: '',
    error: null,
    data: null
} 

type Props = {
    action: IFormCreationAction,
    fields: ICreationFormField[],
    collection: IOneOfCollectionNames
}

export default function AdminCreationForm({ action, fields, collection } : Props) {

    const boundAction = action.bind(null, collection)

    const [state, formAction] = useFormState(boundAction, initialState)

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
            <AdminFormSubmit/>
        </form>
    )
}
