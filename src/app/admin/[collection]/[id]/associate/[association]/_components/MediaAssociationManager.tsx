import React from 'react'
import { IContest } from '@/types'
import { getMediaFieldsByCollection } from '@/lib/forms/collection'
import MediaForm from '@/lib/forms/components/MediaForm'

export default function MediaAssociationManager({ collectionItem } : { collectionItem: IContest }) {

  const mediaFields = getMediaFieldsByCollection({ collection: 'contests' })

    return (
        <div className="grid lg:grid-cols-2 gap-2">
            {
                mediaFields.map((field, index) => 
                    <MediaForm
                        key={ index }
                        collection={ 'contests' }
                        collectionItem={ collectionItem }
                        field={ field }
                        domain={ collectionItem.domain }
                    />
                )
            }
        </div>
    )
}
