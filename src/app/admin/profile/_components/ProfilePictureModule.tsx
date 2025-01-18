import React from 'react'
import { Profile as ProfileIcon } from '../../_layout/design/icons/components/Profile'
import Image from 'next/image'
import { IManager } from '@/types'

export default function ProfilePictureModule({ manager } : { manager: IManager }) {

    if (!manager.Medium) {
        return (
            <div className='group w-full h-full max-w-24 max-h-24 min-h-24 min-w-24 flex my-4 cursor-pointer'>
                <div className='rounded-full border-2 border-gray-400 bg-gray-800 w-full h-full flex justify-center items-center'>
                    <ProfileIcon className='group-hover:animate-pulse text-gray-400'/>
                </div>
            </div>
        )
    }

    const { src, width, height, alt } = manager.Medium

    return (
        <div className='w-full h-full max-w-24 max-h-24 flex my-4'>
            <div className='rounded-full border-2 border-gray-400 bg-gray-800 w-full h-full flex justify-center items-center'>
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
