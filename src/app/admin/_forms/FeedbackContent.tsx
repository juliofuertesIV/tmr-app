import { IAPIResponse } from '@/interfaces/forms'
import React from 'react'

export default function FeedbackContent({ formState } : { formState: IAPIResponse | null }) {
    
    if (!formState) return

    if (formState.error) {
        return (
            <div className="px-4 py-1 text-sm w-full rounded-md bg-red-400">    
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
        <div className="px-4 py-1 text-sm w-full rounded-md bg-green-400">
            <p>{ formState.message }</p>
        </div>
    )
}
