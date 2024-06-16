'use client'

import NextImage from 'next/image'
import React, { useRef } from 'react'

type Props = {
    src: string | null,
    width: number,
    height: number,
    onDiscardFile: () => void
}

export default function FileInputPreview({ src, width, height, onDiscardFile } : Props) {

    const previewRef = useRef<HTMLImageElement>(null)

    if (!src) return null

    return (
        <div className='flex w-full mx-auto border-2 border-dashed border-neutral-600 relative'>
            <NextImage
                className='rounded-sm w-full max-w-full object-contain'
                ref={ previewRef }
                src={ src }
                width={ width }
                height={ height }
                alt={ '' }
            />
            <div className='absolute top-3 left-2'>
                <button 
                    type='button'
                    role='button'
                    onClick={ () => onDiscardFile() }
                    className='px-4 py-1 rounded-sm bg-neutral-200 text-neutral-800 cursor-pointer hover:bg-neutral-50 hover:text-neutral-900'
                >
                    Descartar
                </button>
            </div>
        </div>
    ) 
}

