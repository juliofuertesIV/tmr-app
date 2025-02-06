import Image from 'next/image'
import React from 'react'
import { Cog as CogIcon } from '@/app/admin/_layout/design/icons/components/Cog' 
import { Close as CloseIcon } from '@/app/admin/_layout/design/icons/components/Close' 
import { useFormStatus } from 'react-dom'
import { IMedia } from '@/types/media'

export default function CurrentMediumPreview({ medium, className, clickAction } : { medium: IMedia, className?: string, clickAction: () => void | undefined }) {

    const { pending } = useFormStatus()

    if (!medium) return (    
        <div 
            className={`border-2 border-gray-400 bg-gray-800 w-full h-full flex justify-center items-center ${ className } pointer-events-none`}
            data-pending={ pending }
        >
            <ProfileIcon className='animate-spin text-gray-400'/> 
        </div>
    )

    const { src, width, height, alt } = medium


    if (pending) {
        return (
            <div className={ `border-2 border-gray-400 bg-gray-800 w-full h-full flex overflow-hidden relative group cursor-pointer ${ className }` }>
                <div className='absolute text-3xl animate-spin'>
                    <CogIcon/>
                </div>
                <Image 
                    className='flex w-full h-full opacity-20 transition-opacity'
                    src={ src } 
                    width={ parseInt(width) } 
                    height={ parseInt(height) } 
                    alt={ alt }
                />
            </div>
        )
    } 

    return (
        <div className={`flex justify-center items-center w-full h-full relative border-2 border-gray-400 bg-gray-800 group cursor-pointer ${ className }` } onClick={ () => clickAction() }>
            <div className='absolute text-xl bg-black rounded-full w-10 h-10 justify-center items-center group-hover:flex hidden'>
                <CloseIcon/>
            </div>
            <div className='flex w-full h-full min-w-full min-h-full'>
                <Image 
                    className='flex w-full h-full group-hover:opacity-20 transition-opacity object-cover'
                    src={ src } 
                    width={ parseInt(width) } 
                    height={ parseInt(height) } 
                    alt={ alt }
                />
            </div>
        </div>
    )
}
