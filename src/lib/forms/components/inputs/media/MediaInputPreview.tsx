'use client'

import Image from 'next/image'
import React from 'react'

type Props = {
    src: string | null,
    width: number,
    height: number,
    classname?: string,
}

export default function MediaInputPreview({ 
    src,
    width,
    height,
    classname
} : Props) {

    if (!src) return (
        <div className={ classname }></div>
    )

    return (
        <div className={ classname }>
            <Image
                className='w-full max-w-full max-h-full object-cover'
                src={ src ? src : '/img/no-image-placeholder.svg' }
                width={ width }
                height={ height }
                alt={ '' }
            />
        </div>
    ) 
}

