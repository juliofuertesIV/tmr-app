import { deleteMediaItem } from "@/lib/fetch/delete"
import { associateItems } from "@/lib/fetch/post"
import { updateCollectionItem } from "@/lib/fetch/put"
import { ICollectionsWithMedia, ICollectionsWithMedium, IContest } from "@/types"
import { IActionTarget } from "@/types/forms"
import { ICollectionsWithMediaNames, ICollectionsWithMediumNames, IMedia, IMediaRole } from "@/types/media"

const getActionTargetByCollectionAndCollectionItem = ({ 
    collectionItem,
    role
}: {
    collectionItem: ICollectionsWithMedia,
    role: IMediaRole
}) : { target: IActionTarget, MediumId?: string } => {
    
    const associatedMedium = collectionItem.Media.find((medium: IMedia) => medium.role === role)
    
    if (!associatedMedium) return { target: 'creation'}
    
    return { target: 'update', MediumId: associatedMedium.id }
}

export const mediaElementAlreadyPresent = (collectionItem: IContest, role: IMediaRole) => {
    const item = collectionItem.Media.find((medium: IMedia) => medium.role === role)
    return item
}

export const getMediumBoundAction = ({
    collection,
    collectionItem
}: {
    collection: ICollectionsWithMediumNames,
    collectionItem: ICollectionsWithMedium
}) => {

    return updateCollectionItem.bind(null, collection, collectionItem.id)
}

export const getMediaBoundAction = ({ 
    collection,
    collectionItem,
    role
} : {
    collection: ICollectionsWithMediaNames,
    collectionItem: ICollectionsWithMedia,
    role: IMediaRole
}) => {

    const { target, MediumId } = getActionTargetByCollectionAndCollectionItem({ collectionItem, role })

    if (target === 'creation') {
        return associateItems.bind(
            null,
            collection, 
            collectionItem.id,
            'media'
        ) 
    }

    return deleteMediaItem.bind(
        null,
        collection,
        collectionItem.id,
        MediumId as string
    )
}