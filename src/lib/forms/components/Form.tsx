'use client'

import { useFormState } from 'react-dom'
import { IFormAction, IFormField } from '@/types/forms'
import { IAllCollections, ICollectionNames, } from '@/types'
import AdminFormFeedback from '../feedback/FormFeedback'
import FormInput from './inputs/FormInput'
import FormSubmit from '@/lib/forms/feedback/FormSubmit'
import { ReactNode, useRef } from 'react'
import { formInitialState } from '../feedback/state'

type Props = {
    boundAction: IFormAction,
    fields: IFormField[],
    children?: ReactNode
    collection?: ICollectionNames | "contest" | "inscriptions",
    domain?: string,
    collectionItem?: IAllCollections,
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
