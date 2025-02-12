'use client'

import { IFormAction, IFormField } from '@/types/forms'
import { AllCollections, CollectionNames, } from '@/types'
import AdminFormFeedback from '../feedback/FormFeedback'
import FormInput from './inputs/FormInput'
import FormSubmit from '@/lib/forms/feedback/FormSubmit'
import { ReactNode, useRef } from 'react'
import { formInitialState } from '../feedback/state'
import { useFormState } from 'react-dom'

type Props = {
    boundAction: IFormAction,
    fields: IFormField[],
    children?: ReactNode
    collection?: CollectionNames | "contest" | "inscriptions",
    domain?: string,
    collectionItem?: AllCollections,
}

export default function Form({ 
    boundAction,
    fields,
    collectionItem,
    children 
} : Props) {

    const formRef = useRef<HTMLFormElement | null>(null)

    const [state, formAction] = useFormState(boundAction, formInitialState)

    if (state.success) formRef.current?.reset()

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
