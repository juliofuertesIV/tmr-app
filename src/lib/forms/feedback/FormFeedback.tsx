'use client'

import { IAPIResponse } from '@/types/api'
import React, { useEffect, useState } from 'react'
import FeedbackContent from './FeedbackContent'
import { CloseIcon } from '@/app/admin/_layout/design/icons/components/Close'

export default function AdminFormFeedback({ state } : { state: IAPIResponse<any> }) {

    const [ formState, setFormState ] = useState<IAPIResponse<any> | null>(null)

    useEffect(() => {

        if (!state || !state.message) setFormState(null)
        else setFormState(state) 

    }, [ state ])

    const closeFeedbackForm = () => setFormState(null)

    if (!formState) return null

    return (
        <div className='fixed left-0 animate-dropdown mx-auto w-full justify-center px-4 items-center flex z-50 cursor-pointer' onClick={ () => closeFeedbackForm() }>
            <div className='text-neutral-900 w-full lg:max-w-md mx-auto py-1 text-center rounded-md relative group'>
                <div className='text-neutral-100 top-2 right-2 absolute opacity-0 group-hover:opacity-100 transition-opacity'>
                    <CloseIcon/>
                </div>
                <FeedbackContent formState={ formState }/>
            </div>
        </div>
    )

}
