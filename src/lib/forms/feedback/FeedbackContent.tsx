import { IAPIResponse } from '@/types/api'
import React from 'react'

export default function FeedbackContent({ formState } : { formState: IAPIResponse<any> | null }) {
    
    if (!formState) return

    const { error } = formState 

    if (error) {

        return (
            <div className="px-4 py-2 text-sm w-full rounded-md bg-red-900 text-neutral-100">
                <p className="text-base pb-1 font-semibold">
                    Error: { formState.message }
                </p>
                <div className='flex flex-col gap-1'>
                    {
                        error.messages?.map((message, index) => 
                            <small key={ index }>
                                { message }
                            </small>
                        )
                    }
                </div>
            </div>
        )    
    }

    return (
        <div className="px-4 py-2 text-sm w-full rounded-md bg-green-400 text-neutral-900">
            <p>{ formState.message }</p>
        </div>
    )
}
