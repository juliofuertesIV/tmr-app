'use client'

import Image from 'next/image'
import React, { useRef } from 'react'

type Props = {
    src: string | null,
    width: number,
    height: number
}

export default function ImagePreview({ 
    src,
    width,
    height,
} : Props) {

    const previewRef = useRef<HTMLImageElement>(null)

    return (
        <Image
            className='w-full max-w-full max-h-full object-contain'
            ref={ previewRef }
            src={ src ? src : '/img/no-image-placeholder.svg' }
            width={ width }
            height={ height }
            alt={ '' }
        />
    ) 
}

