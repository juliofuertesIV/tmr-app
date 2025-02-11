import { IContest, CollectionNames, Inscription, Sponsor, Manager } from "@/types"
import { IAssociationKeys, IAssociation, ICollectionsWithAssociations, IContestRelationship, IRelationshipIdFieldnames, IAssociationIdFieldnames, IContestRelationshipIdFields, IInscriptionRelationshipIdFields, ISponsorRelationshipIdFields, IMedialessRelationshipIdFieldnames, IMedialessAssociationIdFieldnames, IMedialessAssociationKeys, IMedialessRelationship, IMedialessAssociation, ICollectionsWithAssociationsNames, IManagerRelationshipIdFields } from "@/types/associations"

// TO DO: Tidy up this mess   


export const determineIfItemIsAssociated = ({
    item,
    collectionItem,
    collection,
    associationKey,
    associationIdField,
} : {
    item: IMedialessAssociation | IMedialessRelationship,
    collectionItem: ICollectionsWithAssociations,
    collection: ICollectionsWithAssociationsNames,
    associationIdField: IMedialessRelationshipIdFieldnames | IMedialessAssociationIdFieldnames,
    associationKey: IMedialessAssociationKeys | null,
    
}) => {

    if (!associationKey) return checkRelationshipByCollectionName(item as IMedialessRelationship, collectionItem, associationIdField as IMedialessRelationshipIdFieldnames, collection)

    return (collectionItem as IContest)[associationKey].some(associatedItem => associatedItem.id === item.id) // TO DO: only contests in many to many FOR NOW, ICollectionswithrelationships vs Icollectionswithassociations in the future
}

const checkRelationshipByCollectionName = (item: IMedialessRelationship, collectionItem: ICollectionsWithAssociations, associationIdField: IMedialessRelationshipIdFieldnames, collection: ICollectionsWithAssociationsNames) => {
    return isCurrentRelationshipByCollection[collection](collectionItem, associationIdField, item)
}

export const itemIsContest = (item: ICollectionsWithAssociations, collection: CollectionNames) : item is IContest => collection === 'contests'
export const itemIsInscription = (item: ICollectionsWithAssociations, collection: CollectionNames) : item is Inscription => collection === 'inscriptions'
export const itemIsSponsor = (item: ICollectionsWithAssociations, collection: CollectionNames) : item is Sponsor => collection === 'sponsors'
export const itemIsRelationship = (item: IAssociation | IContestRelationship, associationKey: IAssociationKeys | null) : item is IContestRelationship => !associationKey

const isCurrentRelationshipByCollection = {
    contests: (collectionItem: IContest, field: IMedialessRelationshipIdFieldnames, item: IMedialessRelationship) => collectionItem[field as IContestRelationshipIdFields] === item.id,
    inscriptions: (collectionItem: Inscription, field: IMedialessRelationshipIdFieldnames, item: IMedialessRelationship) => collectionItem[field as IInscriptionRelationshipIdFields] === item.id,
    sponsors: (collectionItem: Sponsor, field: IMedialessRelationshipIdFieldnames, item: IMedialessRelationship) => collectionItem[field as ISponsorRelationshipIdFields] === item.id,
    managers: (collectionItem: Manager, field: IMedialessRelationshipIdFieldnames, item: IMedialessRelationship) => collectionItem[field as IManagerRelationshipIdFields] === item.id,
} as {
    [key in ICollectionsWithAssociationsNames]: (collectionItem: ICollectionsWithAssociations, field: IMedialessRelationshipIdFieldnames, item: IMedialessRelationship) => boolean
}

