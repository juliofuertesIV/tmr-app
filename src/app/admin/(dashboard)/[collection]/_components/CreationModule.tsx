import React from 'react'
import CreationDialog from '../../_components/CreationDialog'
import { CollectionNames } from '@/types'

export default function CreationModule({ collection } : { collection: CollectionNames }) {

    const canAddToCollection = ['contests', 'brands', 'managers', 'sponsors', 'tags'].includes(collection)

    if (!canAddToCollection) return null

    return (
        <div className='mb-4 px-6'>
            <CreationDialog collection={ collection }/>
        </div>
    )
}
