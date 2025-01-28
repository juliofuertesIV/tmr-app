'use client'

import { formSchemaActionIsUpdateAction, getFormSchema } from "@/lib/forms"
import Form from "@/lib/forms/Form"
import { ICollectionNames, IAllCollections } from "@/types"
import { IActionTarget } from "@/types/forms"

export default function CollectionItemFormModule({ collection, collectionItem, target } : { collection: ICollectionNames, collectionItem: IAllCollections, target: IActionTarget }) {

    const { getBoundAction, fields } = getFormSchema({ collection, actionTarget: 'update' })

    if (!formSchemaActionIsUpdateAction(getBoundAction, 'update'))
        throw new Error('Error generating bound action in form!')

    const boundAction = getBoundAction({ id: collectionItem.id })

    return (
        <div className="w-full max-w-xl">
            <Form 
                target={ target }
                boundAction={ boundAction }
                fields={ fields }
                collection={ collection }
                collectionItem={ collectionItem }
            />
        </div>
    )
}
