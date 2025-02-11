'use client'

import { getFormSchema } from "@/lib/forms"
import Form from "@/lib/forms/components/Form"
import { CollectionNames, AllCollections } from "@/types"

export default function CollectionItemFormModule({ collection, collectionItem } : { collection: CollectionNames, collectionItem: AllCollections }) {

    const { bindUpdateAction, fields } = getFormSchema({ collection, actionTarget: 'update' })

    const boundAction = bindUpdateAction({ id: collectionItem.id })

    return (
        <div className="w-full max-w-xl">
            <Form 
                boundAction={ boundAction }
                fields={ fields }
                collectionItem={ collectionItem }
            />
        </div>
    )
}
