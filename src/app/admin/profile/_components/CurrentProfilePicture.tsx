import Image from 'next/image'
import React from 'react'
import { Cog as CogIcon } from '@/app/admin/_layout/design/icons/components/Cog' 
import { Close as CloseIcon } from '@/app/admin/_layout/design/icons/components/Close' 
import { IManager } from '@/types'
import { useFormStatus } from 'react-dom'

export default function CurrentProfilePicture({ manager } : { manager: IManager }) {

    const { src, width, height, alt } = manager.Medium

    const { pending } = useFormStatus()

    if (pending) {
        return (
            <div className='rounded-full border-2 border-gray-400 bg-gray-800 w-full h-full flex justify-center items-center overflow-hidden relative'>
                <div className='absolute text-3xl animate-spin'>
                    <CogIcon/>
                </div>
                <Image 
                    className='flex w-full max-w-full h-full max-h-full object-cover opacity-20 transition-opacity'
                    src={ src } 
                    width={ parseInt(width) } 
                    height={ parseInt(height) } 
                    alt={ alt }
                />
            </div>
        )
    } 

    return (
        <div className='rounded-full border-2 border-gray-400 bg-gray-800 w-full h-full flex justify-center items-center overflow-hidden relative group cursor-pointer'>
            <div className='absolute text-xl bg-black group-hover:flex hidden'>
                <CloseIcon/>
            </div>
            <Image 
                className='flex w-full max-w-full h-full max-h-full object-cover group-hover:opacity-20 transition-opacity'
                src={ src } 
                width={ parseInt(width) } 
                height={ parseInt(height) } 
                alt={ alt }
            />
        </div>
    )
}
