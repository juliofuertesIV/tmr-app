'use client'

import React, { useRef } from 'react'
import { IManager } from '@/types'
import MediaForm from '@/lib/forms/components/media/MediaForm'

export default function ProfilePictureModule({ manager } : { manager: IManager }) {

    return (
        <div className='w-full h-full max-w-24 max-h-24 min-h-24 min-w-24 flex my-4 cursor-pointer'>
            <MediaForm collectionItem={ manager } collection='managers' role='profile' previewClassName='rounded-full'/>
        </div>
    )
}
