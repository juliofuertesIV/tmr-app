'use client'

import { ICollectionNames } from '@/types'
import AssociationInput from './AssociationInput'
import { determineIfItemIsAssociated, itemIsRelationship } from '../_utils'
import { ICollectionsWithAssociations, IMedialessAssociation, IMedialessRelationship, IMedialessRelationshipNames, IMedialessAssociationNames, IMedialessAssociationKeys, IMedialessAssociationIdFieldnames, IMedialessRelationshipIdFieldnames, ICollectionsWithAssociationsNames } from '@/types/associations'

type Props = {
    collectionItem: ICollectionsWithAssociations,
    associationItems: IMedialessAssociation[] | IMedialessRelationship[],
    association: IMedialessAssociationNames | IMedialessRelationshipNames,
    associationKey: IMedialessAssociationKeys | null,
    associationIdField: IMedialessAssociationIdFieldnames | IMedialessRelationshipIdFieldnames,
    collection: ICollectionsWithAssociationsNames
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
