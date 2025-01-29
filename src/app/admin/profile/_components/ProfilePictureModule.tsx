'use client'

import React, { useRef } from 'react'
import { IManager } from '@/types'
import ProfilePictureForm from './ProfilePictureForm'

export default function ProfilePictureModule({ manager } : { manager: IManager }) {

    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const deleteMediaFormRef = useRef<HTMLFormElement | null>(null)

    const activateFileInput = () => fileInputRef.current?.click()
    const deleteCurrentMedia = () => deleteMediaFormRef.current?.requestSubmit()

    const clickAction = manager.MediumId ? deleteCurrentMedia : activateFileInput
    
    // TO DO: This up here could go away

    return (
        <div className='w-full h-full max-w-24 max-h-24 min-h-24 min-w-24 flex my-4 cursor-pointer'>
            <ProfilePictureForm manager={ manager } inputRef={ fileInputRef } formRef={ deleteMediaFormRef } clickAction={ clickAction }/>
        </div>
    )
}
