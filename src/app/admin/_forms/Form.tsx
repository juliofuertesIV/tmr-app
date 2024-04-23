'use client'

import { useFormState } from 'react-dom'
import FormSubmit from './FormSubmit'
import { CreationFormByCollectionName, FormState } from '@/interfaces/forms'
import FormFeedback from './FormFeedback'
import { useEffect } from 'react'

const initialState : FormState = {
    success: false,
    message: '',
    error: null,
    data: null
} 

export default function Form({ action, fields } : CreationFormByCollectionName) {

    const [state, formAction] = useFormState(action, initialState)

    useEffect(() => {
        
    }, [ state ])

    return (
        <form 
            className="flex flex-col gap-2 w-full"
            action={ formAction }
        >
            <FormFeedback formState={ state } />
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
            <FormSubmit/>
        </form>
    )
}
