import React from 'react'
import CreationDialog from '../../_dashboard/CreationDialog'
import { ICollectionNames } from '@/types'

export default function CreationModule({ collection } : { collection: ICollectionNames }) {

    const canAddToCollection = ['contests', 'brands', 'managers', 'genres', 'sponsors', 'tags'].includes(collection)

    if (!canAddToCollection) return null

    return (
        <div className='mb-4 px-6'>
            <CreationDialog collection={ collection }/>
        </div>
    )
}
