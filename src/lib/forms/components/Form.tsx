'use client'

import { useFormState } from 'react-dom'
import { IFormAction, IFormField } from '@/types/forms'
import { IAllCollections } from '@/types'
import AdminFormFeedback from '../feedback/FormFeedback'
import FormInput from './inputs/FormInput'
import FormSubmit from '@/lib/forms/feedback/FormSubmit'
import { ReactNode } from 'react'
import { formInitialState } from '../feedback/state'

type Props = {
    boundAction: IFormAction,
    fields?: IFormField[],
    collectionItem?: IAllCollections,
    children?: ReactNode
}

export default function Form({ 
    boundAction,
    fields,
    collectionItem,
    children 
} : Props) {

    const [state, formAction] = useFormState(boundAction, formInitialState)

    return (
        <form 
            className="flex flex-col gap-2 w-full max-w-xl"
            action={ formAction }
        >
            <AdminFormFeedback state={ state } />
            { children }
            { 
                fields?.map((field, index) => 
                    <FormInput key={ index } field={ field } collectionItem={ collectionItem }/>) 
            }
            <FormSubmit/>
        </form>
    )
}
