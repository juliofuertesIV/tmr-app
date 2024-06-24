'use client'

import { ICollectionsWithMedia, IContest } from '@/types'
import React, { useState } from 'react'
import MediaFormWrapper from '../../[association]/_components/MediaFormWrapper'
import { IMediaFormField } from '@/types/forms'
import { contestFooterField as list } from '@/lib/forms/collection/fields/contests'

export default function FooterManager({ contest } : { contest: IContest }) {

    const [ footerFieldList, setFooterFieldList ] = useState<IMediaFormField[]>([ ...list ])

    // Create new database entity sponsor ? name, media onetomany, contest many to many?

    return (
        <MediaFormWrapper
            collection={ 'contests' }
            collectionItem={ contest as ICollectionsWithMedia }
            mediaFields={ footerFieldList }
        />
    )
}
