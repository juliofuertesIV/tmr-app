import { IAPIResponse } from '@/lib/types/api'
import React from 'react'

export default function FeedbackContent({ formState } : { formState: IAPIResponse<any> | null }) {
    
    if (!formState) return

    const { error } = formState 

    if (error) {

        return (
            <div className="px-4 py-1 text-sm w-full rounded-md bg-red-400">    
                <p>
                    { formState.message }
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
        <div className="px-4 py-1 text-sm w-full rounded-md bg-green-400">
            <p>{ formState.message }</p>
        </div>
    )
}
