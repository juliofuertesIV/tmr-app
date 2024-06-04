import { IContest, ICollectionNames } from "@/types"
import { IAssociationNames, IAssociationKeys, IAssociations, ICollectionsWithAssociations } from "@/types/associations"

const associationOptionsByName : {
    [key in IAssociationNames]: IAssociationKeys
} = {
    params: 'Params',
    genres: 'Genres',
    social: 'SocialMedia',
    media: 'Media',
}

export const getAssociationOptionsByName = (association: IAssociationNames) => {
    return associationOptionsByName[association]
}
 
export const itemIsContest = (item: ICollectionsWithAssociations, collection: ICollectionNames) : item is IContest => collection === 'contests'

export const determineIfItemIsAssociated = ({
    item,
    collectionItem,
    collection,
    associationKey,
} : {
    item: IAssociations,
    collectionItem: ICollectionsWithAssociations,
    collection: ICollectionNames,
    associationKey: IAssociationKeys,
    
}) => {

    if (!itemIsContest(collectionItem, collection)) return false;

    return collectionItem[associationKey].some(associatedItem => associatedItem.id === item.id)
    
}
