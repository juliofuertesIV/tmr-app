import { IContest } from "@/types"
import { IContestAssociations, IContestAssociationKeys, IContestAssociationIdFieldNames, IContestAssociationNames } from "@/types/associations"

export const determineIfItemIsAssociatedToContest = ({
    item,
    contest,
    associationKey
} : {
    item: IContestAssociations,
    contest: IContest,
    associationKey: IContestAssociationKeys
    
}) => contest[associationKey].some(associatedItem => associatedItem.id === item.id)


export const getAssociationKeyAndIdFieldByName = ({ 
    associationName 
} : { 
    associationName: IContestAssociationNames 
}) => {

    const associationKeysAndIdFields : { 
        [key in IContestAssociationNames]: { 
            associationKey: IContestAssociationKeys,
            associationIdField: IContestAssociationIdFieldNames 
        }} = {
        params: {
            associationKey: 'Params',
            associationIdField: 'ParamId'
        },
        genres: {
            associationKey: 'Genres',
            associationIdField: 'GenreId'
        },
        social: {
            associationKey: 'SocialMedia',
            associationIdField: 'SocialMediumId'
        }
    }

    return associationKeysAndIdFields[associationName]
}

// TO DO: Tidy up this mess   

/* 
const checkRelationshipByCollectionName = (
    item: IMedialessRelationship,
    collectionItem: ICollectionsWithAssociations,
    associationIdField: IMedialessRelationshipIdFieldnames,
    collection: ICollectionsWithAssociationsNames
) => {
    return isCurrentRelationshipByCollection[collection](collectionItem, associationIdField, item)
}

export const itemIsContest = (item: ICollectionsWithAssociations, collection: ICollectionNames) : item is IContest => collection === 'contests'
export const itemIsInscription = (item: ICollectionsWithAssociations, collection: ICollectionNames) : item is IInscription => collection === 'inscriptions'
export const itemIsSponsor = (item: ICollectionsWithAssociations, collection: ICollectionNames) : item is ISponsor => collection === 'sponsors'
export const itemIsRelationship = (item: IAssociation | IRelationship, associationKey: IAssociationKeys | null) : item is IRelationship => !associationKey

const isCurrentRelationshipByCollection = {
    contests: (collectionItem: IContest, field: IMedialessRelationshipIdFieldnames, item: IMedialessRelationship) => collectionItem[field as IContestRelationshipIdFields] === item.id,
    inscriptions: (collectionItem: IInscription, field: IMedialessRelationshipIdFieldnames, item: IMedialessRelationship) => collectionItem[field as IInscriptionRelationshipIdFields] === item.id,
    sponsors: (collectionItem: ISponsor, field: IMedialessRelationshipIdFieldnames, item: IMedialessRelationship) => collectionItem[field as ISponsorRelationshipIdFields] === item.id,
    managers: (collectionItem: IManager, field: IMedialessRelationshipIdFieldnames, item: IMedialessRelationship) => collectionItem[field as IManagerRelationshipIdFields] === item.id,
} as {
    [key in ICollectionsWithAssociationsNames]: (collectionItem: ICollectionsWithAssociations, field: IMedialessRelationshipIdFieldnames, item: IMedialessRelationship) => boolean
}

 */