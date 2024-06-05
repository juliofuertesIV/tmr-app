import { IContest, ICollectionNames } from "@/types"
import { IAssociationKeys, IAssociations, ICollectionsWithAssociations, IRelationships, IRelationshipIdFieldnames, IAssociationIdFieldnames } from "@/types/associations"

export const determineIfItemIsAssociated = ({
    item,
    collectionItem,
    collection,
    associationKey,
    associationIdField,
} : {
    item: IAssociations | IRelationships,
    collectionItem: ICollectionsWithAssociations,
    collection: ICollectionNames,
    associationIdField: IRelationshipIdFieldnames | IAssociationIdFieldnames,
    associationKey: IAssociationKeys | null,
    
}) => {
    
    // TO DO: Tidy up this mess
    if (!itemIsContest(collectionItem, collection)) return false;
    if (itemIsRelationship(item, associationKey)) return collectionItem[associationIdField as IRelationshipIdFieldnames] === item.id
    return collectionItem[associationKey as IAssociationKeys]?.some(associatedItem => associatedItem.id === item.id)  
}

export const itemIsContest = (item: ICollectionsWithAssociations, collection: ICollectionNames) : item is IContest => collection === 'contests'

export const itemIsRelationship = (item: IAssociations | IRelationships, associationKey: IAssociationKeys | null) : item is IRelationships => !associationKey