'use client'

import { IFormAction, IFormField } from '@/types/forms'
import { AllCollections, CollectionWithMediumNames, } from '@/types'
import AdminFormFeedback from '../feedback/FormFeedback'
import FormInput from './inputs/FormInput'
import FormSubmit from '@/lib/forms/feedback/FormSubmit'
import { ReactNode, useRef } from 'react'
import { formInitialState } from '../feedback/state'
import { useFormState } from 'react-dom'
import MediaInput from './inputs/media/MediaInput'

type Props = {
    boundAction: IFormAction,
    fields: IFormField[],
    children?: ReactNode
    mediaCollection?: CollectionWithMediumNames,
    domain?: string,
    collectionItem?: AllCollections,
}

export default function Form({ 
    boundAction,
    fields,
    collectionItem,
    mediaCollection,
    domain,
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
            <AdminFormFeedback state={ state }/>
            { 
                fields?.map((field, index) => {
                    if (field.media) {

                        if (!mediaCollection || !domain) throw new Error('No collection or domain provided for media field.')

                        const { accept, role, previewClassname } = field.media

                        return (
                            <MediaInput 
                                key={ index + '_media' }
                                accept={ accept }
                                role={ role }
                                collection={ mediaCollection }
                                domain={ domain }
                                previewClassname={ previewClassname }
                            />
                        )
                    } 
                    else return <FormInput key={ index } field={ field } collectionItem={ collectionItem }/>
                })
            }
            { children }
            <FormSubmit/>
        </form>
    )
}
