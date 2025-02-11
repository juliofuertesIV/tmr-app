import React from 'react'
import CreationDialog from '../../_dashboard/CreationDialog'
import { CollectionNames } from '@/types'

export default function CreationModule({ collection } : { collection: CollectionNames }) {

    const canAddToCollection = ['contests', 'brands', 'managers', 'genres', 'sponsors', 'tags'].includes(collection)

    if (!canAddToCollection) return null

    return (
        <div className='mb-4 px-6'>
            <CreationDialog collection={ collection }/>
        </div>
    )
}
