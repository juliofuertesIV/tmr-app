import { addMediaToItem, associateMediaToItem } from "@/lib/fetch/post/media"
import { updateCollectionItemMedium } from "@/lib/fetch/put/media"
import { ICollectionsWithMedia, CollectionsWithMedium, IContest } from "@/types"
import { ICollectionsWithMediaNames, ICollectionsWithMediumNames, IMedia, IMediaRole } from "@/types/media"

export const getCurrentMediumId = (collectionItem: IContest, role: IMediaRole) => {

    const mediumId = collectionItem.Media.find((medium: IMedia) => medium.role === role)?.id
    return mediumId || null
}

export const getAddMediumBoundAction = ({
    collection,
    collectionItem
}: {
    collection: ICollectionsWithMediumNames,
    collectionItem: CollectionsWithMedium,
}) => {

    return addMediaToItem.bind(null, collection, collectionItem.id)
}

export const getUpdateMediumBoundAction = ({
    collection,
    collectionItem,
    MediumId
}: {
    collection: ICollectionsWithMediumNames,
    collectionItem: CollectionsWithMedium,
    MediumId: string
}) => {

    return updateCollectionItemMedium.bind(null, collection, collectionItem.id, MediumId)
}

export const getAssociateMediaBoundAction = ({ 
    collection,
    collectionItem
} : {
    collection: ICollectionsWithMediaNames,
    collectionItem: ICollectionsWithMedia,
}) => {

    return associateMediaToItem.bind(
        null,
        collection, 
        collectionItem.id
    )
    
}
