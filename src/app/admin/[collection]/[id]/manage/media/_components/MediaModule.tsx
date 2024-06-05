'use client'

import Form from "@/lib/forms/Form"
import { getFormByCollectionName, getMediaFieldsByCollection } from "@/lib/forms/collection"
import ContestMediaManager from "@/lib/forms/inputs/media/ContestMediaManager"
import { ICollectionNames, IAllCollections } from "@/types"
import { ICollectionsWithMediaNames } from "@/types/media"

export default function MediaModule({ collection, collectionItem } : { collection: ICollectionNames, collectionItem: IAllCollections }) {

    const { action } = getFormByCollectionName({ collection, actionTarget: 'update' })

    const fields = getMediaFieldsByCollection({ collection: collection as ICollectionsWithMediaNames })

    return (
        <ContestMediaManager contest={ collectionItem }/>
    )

    // TO DO: Make this work. Edition module form etc.
    return (
        <div className="w-full max-w-xl">
            <Form collection={ collection } mediaFields={ fields } action={ action } collectionItem={ collectionItem }/>
        </div>
    )
}
