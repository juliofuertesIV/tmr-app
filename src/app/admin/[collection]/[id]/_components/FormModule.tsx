'use client'

import Form from "@/lib/forms/Form"
import { getFormByCollectionName, getMediaFieldsByCollection } from "@/lib/forms/collection"
import { ICollectionNames, IAllCollections } from "@/types"
import { IActionTarget } from "@/types/forms"

export default function FormModule({ collection, collectionItem, target } : { collection: ICollectionNames, collectionItem: IAllCollections, target: IActionTarget }) {

    const { action, fields } = getFormByCollectionName({ collection, actionTarget: 'update' })

    const mediaFields = getMediaFieldsByCollection({ collection })

    return (
        <div className="w-full max-w-xl">
            <Form 
                target={ target }
                action={ action }
                fields={ fields }
                mediaFields={ mediaFields }
                collection={ collection }
                collectionItem={ collectionItem }
            />
        </div>
    )
}
