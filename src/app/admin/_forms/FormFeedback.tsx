import { FormState } from '@/interfaces/forms'
import React from 'react'

export default function FormFeedback({ formState } : { formState: FormState }) {

    if (!formState || !formState.message) return null

    const bgColor = formState.error ? 'red-900' : 'green-800'

    return (
        <p className={ `px-4 py-1 text-sm rounded-md bg-${bgColor}` }>
            { formState.message }
        </p>
    )
}
