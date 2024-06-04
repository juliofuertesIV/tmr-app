'use client'

import Form from "@/lib/forms/Form"
import { getFormByCollectionName } from "@/lib/forms/collection"
import { ICollectionNames, IAllCollections } from "@/types"

export default function EditionModule({ collection, collectionItem } : { collection: ICollectionNames, collectionItem: IAllCollections }) {

    const { action, fields } = getFormByCollectionName({ collection, actionTarget: 'update' })

    return (
        <div className=" w-full max-w-xl">
            <Form collection={ collection } fields={ fields } action={ action } collectionItem={ collectionItem }/>
        </div>
    )
}
