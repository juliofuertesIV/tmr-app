import Image from 'next/image'
import React from 'react'
import { CogIcon as CogIcon } from '@/app/admin/_layout/design/icons/components/Cog' 
import { CollectionsWithMedium } from '@/types'
import { useFormStatus } from 'react-dom'

export default function MediaInputPreview({ collectionItem, clickAction } : { collectionItem: CollectionsWithMedium, clickAction: () => void | undefined }) {

    const { src, width, height, alt } = collectionItem.Medium

    const { pending } = useFormStatus()

    const managePreviewClick = () => pending ? null : clickAction()

    return (
        <div
            data-pending={ pending } 
            className='rounded-full border-2 border-gray-400 bg-gray-800 w-full h-full flex justify-center items-center overflow-hidden relative data-[pending="true"]:pointer-events-none'
            onClick={ () => managePreviewClick() }
        >
            {
                !!pending && (
                    <div className='absolute text-3xl animate-spin'>
                        <CogIcon/>
                    </div>
                )
            }
            <Image 
                className='flex w-full max-w-full h-full max-h-full object-cover transition-opacity group-data-[pending="true"]:opacity-20'
                src={ src ? src : '/img/no-image-placeholder.svg' } 
                width={ parseInt(width) } 
                height={ parseInt(height) } 
                alt={ alt }
            />
        </div>
    )
} 

