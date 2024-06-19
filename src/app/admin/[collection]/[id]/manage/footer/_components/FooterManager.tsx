'use client'

import { ICollectionsWithMedia, IContest } from '@/types'
import React from 'react'
import MediaFormWrapper from '../../[association]/_components/MediaFormWrapper'

export default function FooterManager({ contest } : { contest: IContest }) {
    return (
        <MediaFormWrapper
            collection={ 'contests' }
            collectionItem={ contest as ICollectionsWithMedia }
            mediaFields={ [] }
        />
    )
}
