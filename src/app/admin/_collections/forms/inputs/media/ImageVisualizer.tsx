'use client'

import { IContestMedia } from '@/interfaces'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

type Props = {
    currentMedia: IContestMedia | null,
    newImage: File | null
}

export default function ImageVisualizer({ currentMedia, newImage } : Props) {

    const previewRef = useRef<HTMLImageElement>(null)

    const [ previewSrc, setPreviewSrc ] = useState<string | null>(null) 

    useEffect(() => {

        if (!newImage) return

        const reader = new FileReader();

        reader.addEventListener(
            "load",
            () => {
                const src = reader.result as string
                if (!src) return
                // convert image file to base64 string
                setPreviewSrc(src)
            },
            false,
          );

          reader.readAsDataURL(newImage)

    }, [ newImage ])

    if (!currentMedia && !newImage) return null

    if (!currentMedia) return null
    
    const { src, width, height, alt } = currentMedia

    const numericWidth = parseInt(width)
    const numericHeight = parseInt(height)

    return (
        <div className='flex w-full justify-center gap-4 my-2'>
            <div className='flex-1'>
                <div className='aspect-square w-full flex border-2 border-green-400 rounded-md overflow-hidden relative'>
                    <Image
                        className='object-contain bg-neutral-800 rounded-sm'
                        src={ src }
                        width={ numericWidth }
                        height={ numericHeight }
                        alt={ alt }
                    />
                    <div className='absolute bg-neutral-100 px-2 py-1 text-neutral-800 rounded-md top-3 left-2'>
                        Imagen actual
                    </div>
                </div>
            </div>
            <div className='flex-1'>
            {
                !!previewSrc && 
                <div className='aspect-square w-full flex border-2 border-orange-400 rounded-md overflow-hidden relative'>
                    <Image
                        className='object-contain bg-neutral-800 rounded-sm'
                        ref={ previewRef }
                        src={ previewSrc }
                        width={ numericWidth }
                        height={ numericHeight }
                        alt={ '' }
                    />
                    <div className='absolute bg-neutral-100 px-2 py-1 text-neutral-800 rounded-md top-3 left-2'>
                        Imagen nueva
                    </div>
                </div>
            }
            </div>
        </div>
    )
}

