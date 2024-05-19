import { IAssociationTypes, IContest, IManyToManyAssociationKeys, IManyToManyContestKeys, IOneOfAssociations, IOneOfCollectionNames, IOneOfCollectionsWithAssociations, ISimpleAssociationKeys } from "@/types"

const associationOptionsByName : {
    [key in IAssociationTypes]: {
        associationKey: ISimpleAssociationKeys | IManyToManyAssociationKeys,
        isManyToMany: boolean
    }
} = {
    params: {
        associationKey: 'Params',
        isManyToMany: true
    },
    genres: {
        associationKey: 'Genres',
        isManyToMany: true
    },
    social: {
        associationKey: 'SocialMedia',
        isManyToMany: true
    },
    states: {
        associationKey: 'StateId',
        isManyToMany: false
    },
    brands: {
        associationKey: 'BrandId',
        isManyToMany: false
    },
}

export const getAssociationOptionsByName = (association: IAssociationTypes) => {
    return associationOptionsByName[association]
}
 
export const itemIsContest = (item: IOneOfCollectionsWithAssociations, collection: IOneOfCollectionNames) : item is IContest => collection === 'contests'

export const determineIfItemIsAssociated = ({
    item,
    collectionItem,
    collection,
    associationKey,
    isManyToMany
} : {
    item: IOneOfAssociations,
    collectionItem: IOneOfCollectionsWithAssociations,
    collection: IOneOfCollectionNames,
    associationKey: ISimpleAssociationKeys | IManyToManyAssociationKeys,
    isManyToMany: boolean
    
}) => {
    if (!itemIsContest(collectionItem, collection)) return false;

    if (isManyToMany) {
        // e. g. contest.Media || contest.Params
        return collectionItem[associationKey as IManyToManyContestKeys].some(associatedItem => associatedItem.id === item.id)
    }
    else {
        // e.g. contest.BrandId || contest.StateId
        return collectionItem[associationKey as keyof IContest] === item.id
    }
}
