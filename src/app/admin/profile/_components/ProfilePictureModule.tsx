'use client'

import React, { useRef } from 'react'
import { Profile as ProfileIcon } from '../../_layout/design/icons/components/Profile'
import Image from 'next/image'
import { IManager } from '@/types'
import ProfilePictureForm from './ProfilePictureForm'

export default function ProfilePictureModule({ manager } : { manager: IManager }) {

    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const activateFileInput = () => fileInputRef.current?.click()

    if (!manager.Medium) {
        return (
            <div className='group w-full h-full max-w-24 max-h-24 min-h-24 min-w-24 flex my-4 cursor-pointer' onClick={ () => activateFileInput() }>
                <div className='rounded-full border-2 border-gray-400 bg-gray-800 w-full h-full flex justify-center items-center'>
                    <ProfileIcon className='group-hover:animate-pulse text-gray-400'/>
                    <ProfilePictureForm inputRef={ fileInputRef }/>
                </div>
            </div>
        )
    }

    const { src, width, height, alt } = manager.Medium

    return (
        <div className='w-full h-full max-w-24 max-h-24 flex my-4'>
            <div className='rounded-full border-2 border-gray-400 bg-gray-800 w-full h-full flex justify-center items-center relative'>
                <Image 
                    src={ src } 
                    width={ parseInt(width) } 
                    height={ parseInt(height) } 
                    alt={ alt }
                />
            </div>
        </div>
    )
}
