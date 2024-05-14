'use client'

import { IAPIResponse } from '@/interfaces/api'
import React, { useEffect, useState } from 'react'
import FeedbackContent from './FeedbackContent'

export default function AdminFormFeedback({ state } : { state: IAPIResponse }) {

    const [ formState, setFormState ] = useState<IAPIResponse | null>(null)

    useEffect(() => {

        if (!state || !state.message) setFormState(null)
        else setFormState(state) 

    }, [ state ])

    useEffect(() => {

        setTimeout(() => {
            setFormState(null)
        }, 3500)

    }, [ formState ])

    if (!formState) return null

    return (
        <div className='fixed top-2 left-0 mx-auto w-full justify-center items-center flex z-50'>
            <div className='text-neutral-900 w-fit mx-auto py-1 text-center rounded-md'>
                <FeedbackContent formState={ formState }/>
            </div>
        </div>
    )

}
