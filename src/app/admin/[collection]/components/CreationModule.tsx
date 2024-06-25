import React from 'react'
import CreationDialog from '../../_dashboard/CreationDialog'
import { ICollectionNames } from '@/types'

export default function CreationModule({ collection } : { collection: ICollectionNames }) {

    const canAddToCollection = ['contests', 'brands', 'managers', 'genres', 'sponsors'].includes(collection)

    if (!canAddToCollection) return null

    return (
        <CreationDialog collection={ collection }/>
    )
}
