'use client'

import Form from "@/forms/Form"
import { getFormByCollectionName } from "@/forms/collection"
import { IOneOfCollectionNames, IOneOfCollections } from "@/types"

export default function EditionModule({ collection, collectionItem } : { collection: IOneOfCollectionNames, collectionItem: IOneOfCollections }) {

    const { action, fields } = getFormByCollectionName({ collection, actionTarget: 'update' })

    return (
        <div className=" w-full max-w-xl">
            <Form collection={ collection } fields={ fields } action={ action } collectionItem={ collectionItem }/>
        </div>
    )
}
