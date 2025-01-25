'use client'

import React, { MutableRefObject } from 'react'
import Image from 'next/image'
import { Close as CloseIcon } from '@/app/admin/_layout/design/icons/components/Close' 
import { IManager } from '@/types'
import { deleteMediaItem } from '@/lib/fetch/delete'

type Props = { 
    manager: IManager,
    deleteMediaFormRef: MutableRefObject<HTMLFormElement | null>;
}

export default function ProfileCurrentMedium({ manager, deleteMediaFormRef } : Props) {

    
    const { src, width, height, alt } = manager.Medium

    const action = deleteMediaItem.bind(null, 'managers', manager.MediumId)

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
            <form action={ action } ref={ deleteMediaFormRef } className='hidden'/>
        </div>
    )
}
