'use client'

import { ICollectionNames } from '@/types'
import AssociationInput from './AssociationInput'
import { determineIfItemIsAssociated } from '../_utils'
import { IAssociationNames, IAssociationKeys, IAssociations, ICollectionsWithAssociations } from '@/types/associations'

type Props = {
    collectionItem: ICollectionsWithAssociations,
    associationItems: IAssociations[],
    association: IAssociationNames,
    associationKey: IAssociationKeys,
    collection: ICollectionNames
}

export default function AssociationManager({ 
    collectionItem,
    associationItems,
    association,
    collection,
    associationKey 
} : Props) {
    
    return (
        <div className=" flex flex-col gap-2 w-full max-w-2xl mx-auto">
            {
                associationItems.map((item, index) => {

                    const isCurrentlyAssociated = determineIfItemIsAssociated({ item, collection, collectionItem, associationKey })

                    return (
                        <AssociationInput 
                            key={ index }
                            collection={ collection }
                            collectionItem={ collectionItem }
                            association={ association }
                            associationItem={ item }
                            isCurrentlyAssociated={ isCurrentlyAssociated }
                        />
                    )
                })
            }
        </div>
    )
}
