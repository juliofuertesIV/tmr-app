'use client'

import { ICollectionNames } from '@/types'
import AssociationInput from './AssociationInput'
import { determineIfItemIsAssociated, itemIsRelationship } from '../_utils'
import { IAssociationNames, IAssociationKeys, IAssociations, ICollectionsWithAssociations, IRelationshipNames, IRelationshipIdFieldnames, IRelationships, IAssociationIdFieldnames } from '@/types/associations'

type Props = {
    collectionItem: ICollectionsWithAssociations,
    associationItems: IAssociations[] | IRelationships[],
    association: IAssociationNames | IRelationshipNames,
    associationKey: IAssociationKeys | null,
    associationIdField: IAssociationIdFieldnames | IRelationshipIdFieldnames,
    collection: ICollectionNames
}

export default function AssociationManager({ 
    collectionItem,
    associationItems,
    association,
    collection,
    associationKey,
    associationIdField
} : Props) {
    
    return (
        <div className=" flex flex-col gap-2 w-full max-w-2xl mx-auto">
            {
                associationItems.map((item, index) => {

                    const isCurrentlyAssociated = determineIfItemIsAssociated({ item, collection, collectionItem, associationKey, associationIdField })
                    const isRelationship = itemIsRelationship(item, associationKey)

                    return (
                        <AssociationInput 
                            key={ index }
                            isRelationship={ isRelationship }
                            collection={ collection }
                            collectionItem={ collectionItem }
                            association={ association }
                            associationItem={ item }
                            associationIdField={ associationIdField }
                            isCurrentlyAssociated={ isCurrentlyAssociated }
                        />
                    )
                })
            }
        </div>
    )
}
