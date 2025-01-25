'use client'

import React, { useRef } from 'react'
import { Profile as ProfileIcon } from '../../_layout/design/icons/components/Profile'
import { IManager } from '@/types'
import ProfilePictureForm from './ProfilePictureForm'
import ProfileCurrentMedium from './ProfileCurrentMedium'

export default function ProfilePictureModule({ manager } : { manager: IManager }) {

    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const deleteMediaFormRef = useRef<HTMLFormElement | null>(null)

    const activateFileInput = () => fileInputRef.current?.click()
    const deleteCurrentMedia = () => deleteMediaFormRef.current?.requestSubmit()

    if (!manager.Medium) {
        return (
            <div className='group w-full h-full max-w-24 max-h-24 min-h-24 min-w-24 flex my-4 cursor-pointer' onClick={ () => activateFileInput() }>
                <div className='rounded-full border-2 border-gray-400 bg-gray-800 w-full h-full flex justify-center items-center'>
                    <ProfileIcon className='group-hover:animate-pulse text-gray-400'/>
                    <ProfilePictureForm manager={ manager } inputRef={ fileInputRef }/>
                </div>
            </div>
        )
    }

    return (
        <div className='w-full h-full max-w-24 max-h-24 flex my-4' onClick={ () => deleteCurrentMedia() }>
            <ProfileCurrentMedium manager={ manager } deleteMediaFormRef={ deleteMediaFormRef }/>
        </div>
    )
}
