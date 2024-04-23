'use client'

import { useFormState } from 'react-dom'
import AdminFormSubmit from './AdminFormSubmit'
import { ICreationFormByCollectionName, IAPIResponse, IFormCreationAction, ICreationFormField } from '@/interfaces/forms'
import AdminFormFeedback from './AdminFormFeedback'
import { useEffect } from 'react'
import { IOneOfCollectionNames } from '@/interfaces'

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

    console.log({ collection })

    const boundAction = action.bind(null, collection)

    const [state, formAction] = useFormState(boundAction, initialState)

    useEffect(() => {
        
    }, [ state ])


    return (
        <form 
            className="flex flex-col gap-2 w-full"
            action={ formAction }
        >
            <AdminFormFeedback formState={ state } />
            {
                fields.map((field, index) => {
                    return (
                        <label key={ index } className="w-full flex flex-col pb-1">
                            <div className="w-full">{ field.label }</div>
                            <input 
                                className="w-full rounded-sm bg-stone-800 pl-1"
                                type="text"
                                name={ field.name }
                                required={ field.required }
                            />
                        </label>
                    )
                })
            }
            <AdminFormSubmit/>
        </form>
    )
}
