import Image from 'next/image'
import React from 'react'
import { Cog as CogIcon } from '@/app/admin/_layout/design/icons/components/Cog' 
import { Close as CloseIcon } from '@/app/admin/_layout/design/icons/components/Close' 
import { useFormStatus } from 'react-dom'
import { IMedia } from '@/types/media'

export default function CurrentMediumPreview({ medium, className, clickAction } : { medium: IMedia, className?: string, clickAction: () => void | undefined }) {

    const { src, width, height, alt } = medium

    const { pending } = useFormStatus()

    if (pending) {
        return (
            <div className={ `border-2 border-gray-400 bg-gray-800 w-full h-full flex justify-center items-center overflow-hidden relative group cursor-pointer ${ className }` }>
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
        <div className={`border-2 border-gray-400 bg-gray-800 w-full h-full flex justify-center items-center overflow-hidden relative group cursor-pointer ${ className }` } onClick={ () => clickAction() }>
            <div className='absolute text-xl bg-black rounded-full w-10 h-10 justify-center items-center group-hover:flex hidden'>
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
