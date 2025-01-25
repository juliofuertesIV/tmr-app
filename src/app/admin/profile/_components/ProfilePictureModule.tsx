'use client'

import React, { useRef } from 'react'

import { IManager } from '@/types'
import DeleteProfilePictureForm from './DeleteProfilePictureForm'
import AddProfilePictureForm from './AddProfilePictureForm'

export default function ProfilePictureModule({ manager } : { manager: IManager }) {

    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const deleteMediaFormRef = useRef<HTMLFormElement | null>(null)

    const activateFileInput = () => fileInputRef.current?.click()
    const deleteCurrentMedia = () => deleteMediaFormRef.current?.requestSubmit()

    if (!manager.Medium) {
        return (
            <div className='group w-full h-full max-w-24 max-h-24 min-h-24 min-w-24 flex my-4' onClick={ () => activateFileInput() }>
                <AddProfilePictureForm manager={ manager } inputRef={ fileInputRef }/>
            </div>
        )
    }

    return (
        <div className='w-full h-full max-w-24 max-h-24 min-h-24 min-w-24 flex my-4' onClick={ () => deleteCurrentMedia() }>
            <DeleteProfilePictureForm manager={ manager } deleteMediaFormRef={ deleteMediaFormRef }/>
        </div>
    )
}
