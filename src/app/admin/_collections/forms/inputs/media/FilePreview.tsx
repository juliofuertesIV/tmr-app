'use client'

import { IContestMedia } from '@/interfaces'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

type Props = {
    file: File | IContestMedia | null,
    onDiscardFile: () => void
}

export default function FilePreview({ file, onDiscardFile } : Props) {

    const previewRef = useRef<HTMLImageElement>(null)

    const [ inputFile, setInputFile ] = useState<File | IContestMedia | null>(null) 
    const [ previewSrc, setPreviewSrc ] = useState<string | null>(null) 
    
    useEffect(() => {
        if (!file) return

        setInputFile(file)

        return () => {
            setInputFile(null)
            setPreviewSrc(null)
        }
    }, [ inputFile, file ])

    useEffect(() => {

        if (!inputFile) return 

        if (!(inputFile instanceof File)) {
            return setPreviewSrc(inputFile.src)
        }

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
        reader.readAsDataURL(inputFile)

    }, [ inputFile ])

    const onRejectFile = () => onDiscardFile()

    if (!previewSrc) return null

    return (
        <div className='flex w-full mx-auto border-2 border-dashed border-neutral-600 relative'>
            <Image
                className='rounded-sm w-full max-w-full object-contain'
                ref={ previewRef }
                src={ previewSrc }
                width={ 500 }
                height={ 500 }
                alt={ '' }
            />
            <div className='absolute top-3 left-2'>
                <button 
                    type='button'
                    role='button'
                    onClick={ onRejectFile }
                    className='px-4 py-1 rounded-sm bg-neutral-200 text-neutral-800 cursor-pointer hover:bg-neutral-50 hover:text-neutral-900'
                >
                    Descartar
                </button>
            </div>
        </div>
    ) 
}

