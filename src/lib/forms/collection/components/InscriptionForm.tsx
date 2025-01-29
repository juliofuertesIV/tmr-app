/* 'use client'

import React from 'react'
import { useFormState } from 'react-dom'
import { formInitialState } from '../../feedback/state'
import FormInput from '../../inputs/FormInput'
import MediaInput from '../../MediaInput'
import { getFormSchema } from '../..'

export default function InscriptionForm({ contestId, domain } : { contestId: string, domain: string }) {

    const [ state, formAction ] = useFormState(boundAction, formInitialState)

    const { bindUpdateAction, fields } = getFormSchema({ collection: 'inscriptions', actionTarget: 'update' })

    const boundAction = bindUpdateAction({ id: contestId })

    return (
        <div className='max-w-xl'>
            <form action={ formAction }>
                <MediaInput 
                    collection='inscriptions'
                    domain={ domain }
                    role='inscriptions'
                    alt='Inscription image.'
                    hasPreview={ true }
                    previewClassname='aspect-video max-w-lg m-4 border-2 border-neutral-200'
                />
                {
                    fields.map((field, index) => {
                        return (
                            <FormInput key={ index } field={ field }/>
                        )
                    })
                }
            
            </form>
        </div>
    )
}
 */