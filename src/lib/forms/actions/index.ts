import { deleteMediaItem, disassociateItems } from "@/lib/fetch/delete"
import { associateItems } from "@/lib/fetch/post"
import { updateCollectionItem } from "@/lib/fetch/put"
import { IAllCollections, ICollectionsWithMedia, IContest } from "@/types"
import { IActionTarget } from "@/types/forms"
import { ICollectionsWithMediaNames, IMedia, IMediaRole } from "@/types/media"

const getActionTargetByCollectionAndCollectionItem = ({ 
    collection,
    collectionItem,
    role
}: {
    collection: ICollectionsWithMediaNames,
    collectionItem: ICollectionsWithMedia,
    role: IMediaRole
}) : { target: IActionTarget, MediumId?: string } => {
    
    if (collection === 'inscriptions') return { target: 'update', MediumId: collectionItem.MediumId }

    const mediaElementAlreadyPresent = (collectionItem as IContest).Media.find((medium: IMedia) => medium.role === role)
    
    if (!!mediaElementAlreadyPresent) return { target: 'update', MediumId: mediaElementAlreadyPresent.id }
    else return { target: 'creation'}
}

export const mediaElementAlreadyPresent = (collectionItem: IContest, role: IMediaRole) => {
    const item = collectionItem.Media.find((medium: IMedia) => medium.role === role)
    return item
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

    const { target, MediumId } = getActionTargetByCollectionAndCollectionItem({ collection, collectionItem, role })

    if (collection === 'inscriptions') updateCollectionItem.bind(null, collection, collectionItem.id)

    if (target === 'creation') return associateItems.bind(null, collection, (collectionItem as IAllCollections).id, 'media') 

    return deleteMediaItem.bind(null, collection, (collectionItem as IAllCollections).id, (MediumId as string))
}