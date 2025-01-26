import React from 'react'
import { Profile as ProfileIcon } from '../../_layout/design/icons/components/Profile'
import { useFormStatus } from 'react-dom'

export default function ProfilePlaceholder({ clickAction } : { clickAction: () => void | undefined }) {

    const { pending } = useFormStatus()

    if (pending) {
        
        return (
            <div className='rounded-full border-2 border-gray-400 bg-gray-800 w-full h-full flex justify-center items-center'>
                <ProfileIcon className='animate-spin text-gray-400'/>
            </div>
        )
    }
    
    return (
        <div className='rounded-full border-2 border-gray-400 bg-gray-800 w-full h-full flex justify-center items-center group' onClick={ () => clickAction() }>
            <ProfileIcon className='group-hover:brightness-150 text-gray-400 transition-all'/>
        </div>
    )
}
