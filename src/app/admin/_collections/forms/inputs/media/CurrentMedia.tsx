import { IContestMedia } from '@/interfaces'
import Image from 'next/image'
import React from 'react'

export default function CurrentMedia({ media } : { media: IContestMedia | null }) {

    if (!media) return null

    const { src, width, height, alt } = media

    return (
        <div className="w-full">
            <Image
                className="max-w-full h-full object-contain"
                src={ src }
                height={ parseInt(height) }
                width={ parseInt(width) }
                alt={ alt }
            /> 
        </div>
    )
}
