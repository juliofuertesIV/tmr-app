import Image from 'next/image'
import React from 'react'
import { useFormStatus } from 'react-dom'
import { IMedia } from '@/types/media'
import MediumPreviewActionIcon from './MediumPreviewActionIcon'
import MediumPreviewLoadingIcon from './MediumPreviewLoadingIcon'

export default function MediumPreview({ medium, className, onClick } : { medium: IMedia | null, className?: string, onClick: () => void | undefined }) {

    const { pending } = useFormStatus()

    const { 
        src, 
        width, 
        height, 
        alt 
    } = medium || { 
        src: '/img/no-image-placeholder.svg', 
        width: "200", 
        height: "300", 
        alt: 'Placeholder' 
    }

    return (
        <div 
            className={`media-preview-container group ${ className }` } 
            onClick={ () => onClick() }
            data-pending={ pending }
        >
            <MediumPreviewActionIcon hasMedium={ !!medium }/>
            <MediumPreviewLoadingIcon/>
            <Image 
                className='flex w-full h-full transition-opacity object-cover group-data-[pending="true"]:opacity-20 group-hover:opacity-20'
                src={ src } 
                width={ parseInt(width) } 
                height={ parseInt(height) } 
                alt={ alt }
            />
        </div>
    )
}
