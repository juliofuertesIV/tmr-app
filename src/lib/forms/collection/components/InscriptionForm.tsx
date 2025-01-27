'use client'

import React from 'react'
import { getAddInscriptionBoundAction } from '../../actions'
import { useFormState } from 'react-dom'
import { formInitialState } from '../../feedback/state'
import { getFormByCollectionName } from '..'
import FormInput from '../../inputs/FormInput'
import MediaInput from '../../MediaInput'

export default function InscriptionForm({ contestId, domain } : { contestId: string, domain: string }) {

    const boundAction = getAddInscriptionBoundAction({ contestId })

    const [ state, formAction ] = useFormState(boundAction, formInitialState)

    const { fields } = getFormByCollectionName({ collection: 'inscriptions', actionTarget: 'update' })

    return (
        <div className='max-w-xl'>
            <form action={ formAction }>
                <MediaInput 
                    collection='inscriptions'
                    domain={ domain }
                    role='incription'
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
