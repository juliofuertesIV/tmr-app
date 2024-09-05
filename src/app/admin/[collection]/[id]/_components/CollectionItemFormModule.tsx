'use client'

import Form from "@/lib/forms/Form"
import { getFormByCollectionName } from "@/lib/forms/collection"
import { ICollectionNames, IAllCollections } from "@/types"
import { IActionTarget } from "@/types/forms"

export default function CollectionItemFormModule({ collection, collectionItem, target } : { collection: ICollectionNames, collectionItem: IAllCollections, target: IActionTarget }) {

    const { action, fields } = getFormByCollectionName({ collection, actionTarget: 'update' })

    return (
        <div className="w-full max-w-xl">
            <Form 
                target={ target }
                action={ action }
                fields={ fields }
                collection={ collection }
                collectionItem={ collectionItem }
            />
        </div>
    )
}
