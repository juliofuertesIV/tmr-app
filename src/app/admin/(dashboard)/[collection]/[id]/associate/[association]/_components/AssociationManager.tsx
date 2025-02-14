'use client'

import { Association, AssociationIdFieldnames, AssociationKeys, AssociationNames, CollectionsWithAssociationNames, CollectionsWithAssociations } from '@/types/associations'
import AssociationInput from './AssociationInput'

type Props = {
    collectionItem: CollectionsWithAssociations,
    associationItems: Association[],
    association: AssociationNames
    associationKey: AssociationKeys,
    associationIdField: AssociationIdFieldnames,
    collection: CollectionsWithAssociationNames
}

export default function AssociationManager({ 
    collectionItem,
    associationItems,
    association,
    collection,
    associationKey
} : Props) {

    return (
        <div className=" flex flex-col gap-2 w-full max-w-2xl">
            {
                associationItems.map((item, index) => {
                    return (
                        <AssociationInput
                            key={ index }
                            collection={ collection }
                            collectionItem={ collectionItem }
                            association={ association }
                            associationItem={ item }
                            associationKey={ associationKey }
                        />
                    )
                })
            }
        </div>
    )
}
