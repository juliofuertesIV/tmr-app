import { IAPIResponse } from '@/interfaces/forms'
import React from 'react'

export default function AdminFormFeedback({ formState } : { formState: IAPIResponse }) {

    if (!formState || !formState.message) return null

    if (formState.error) {

        return (
            <div className={ `px-4 py-1 text-sm rounded-md bg-red-900` }>
                <p>
                    { formState.message }
                </p>
                <div className='flex flex-col gap-1'>
                {
                    formState.error.errors.map((err, index) => {
                        return (
                            <small key={ index }>{ err.message }</small>
                        )
                    })
                            
                }
                </div>
            </div>
        )
    }

    return (
        <p className={ `px-4 py-1 text-sm rounded-md bg-green-900` }>
            { formState.message }
        </p>
    )
}
