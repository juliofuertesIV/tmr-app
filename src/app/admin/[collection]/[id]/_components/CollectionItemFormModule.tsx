'use client'

import { getFormSchema } from "@/lib/forms"
import Form from "@/lib/forms/Form"
import { ICollectionNames, IAllCollections } from "@/types"
import { IActionTarget } from "@/types/forms"

export default function CollectionItemFormModule({ collection, collectionItem, target } : { collection: ICollectionNames, collectionItem: IAllCollections, target: IActionTarget }) {

    const { bindUpdateAction, fields } = getFormSchema({ collection, actionTarget: 'update' })

    const boundAction = bindUpdateAction({ id: collectionItem.id })

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
