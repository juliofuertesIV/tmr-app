
import { deleteMediaItem } from "@/lib/fetch/delete/media"
import { addMediaToItem, associateMediaToItem } from "@/lib/fetch/post/media"
import { updateCollectionItemMedium } from "@/lib/fetch/put/media"
import { ICollectionsWithMedia, ICollectionsWithMedium, IContest } from "@/types"
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
    collectionItem: ICollectionsWithMedium,
}) => {

    return addMediaToItem.bind(null, collection, collectionItem.id)
}

export const getUpdateMediumBoundAction = ({
    collection,
    collectionItem,
    MediumId
}: {
    collection: ICollectionsWithMediumNames,
    collectionItem: ICollectionsWithMedium,
    MediumId: string
}) => {

    return updateCollectionItemMedium.bind(null, collection, collectionItem.id, MediumId)
}

export const getAssociatedMediaBoundAction = ({ 
    collection,
    collectionItem,
    role
} : {
    collection: ICollectionsWithMediaNames,
    collectionItem: ICollectionsWithMedia,
    role: IMediaRole
}) => {

    const associatedMediumId = getCurrentMediumId(collectionItem, role)
    
    if (!associatedMediumId) return (
        associateMediaToItem.bind(
            null,
            collection, 
            collectionItem.id
        )
    ) 
    
    return deleteMediaItem.bind(
        null,
        collection,
        associatedMediumId
    )
}