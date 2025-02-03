'use client'

import { 
    IMedialessAssociation, 
    IMedialessRelationship, 
    IMedialessRelationshipIdFieldnames, 
    ICollectionsWithRelationships, 
    ICollectionsWithRelationshipNames, 
    IRelationshipNames, 
    IMedialessRelationshipKeys 
} from '@/types/associations'

type Props = {
    collectionItem: ICollectionsWithRelationships,
    relationshipItems: IMedialessAssociation[] | IMedialessRelationship[],
    relationship: IRelationshipNames,
    relationshipKey: IMedialessRelationshipKeys,
    relationshipIdField: IMedialessRelationshipIdFieldnames,
    collection: ICollectionsWithRelationshipNames
}

export default function RelationshipModule({ 
    collectionItem,
    relationshipItems,
    relationship,
    collection,
    relationshipKey,
    relationshipIdField
} : Props) {
    
    return (
        <div className=" flex flex-col gap-2 w-full max-w-2xl mx-auto">
            {
                relationshipItems.map((item, index) => {

                    const isCurrentlyAssociated = determineIfItemIsAssociated({ item, collection, collectionItem, relationshipKey, relationshipIdField })

                    return (
                        <RelationshipInput 
                            key={ index }
                            collection={ collection }
                            collectionItem={ collectionItem }
                            relationship={ relationship }
                            relationshipItem={ item }
                            relationshipIdField={ relationshipIdField }
                            isCurrentlyAssociated={ isCurrentlyAssociated }
                        />
                    )
                })
            }
        </div>
    )
}
