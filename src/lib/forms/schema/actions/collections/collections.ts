import { deleteMediaItem } from "@/lib/fetch/delete/media"
import { addCollectionItem } from "@/lib/fetch/post/collections"
import { addMediaToItem } from "@/lib/fetch/post/media"
import { updateCollectionItem } from "@/lib/fetch/put/collections"
import { ICollectionNames } from "@/types"
import { IAssociationNames } from "@/types/associations"
import { ICollectionsWithMediaNames, ICollectionsWithMediumNames } from "@/types/media"

export const getUpdateCollectionItemBoundAction = ({ 
    collection,
    id
} : { 
    collection: ICollectionNames, 
    id: string 
}) => updateCollectionItem.bind(null, collection, id)

export const getAddCollectionItemBoundAction = ({ 
    collection,
} : { 
    collection: ICollectionNames, 
}) => addCollectionItem.bind(null, collection)

/* export const getAssociationBoundInput = ({ 
    collection,
    collectionItemId,
    association
} : { 
    collection: ICollectionNames, 
    collectionItemId: string,
    association: IAssociationNames
}) => associateItems.bind(null, collection, collectionItemId, association)
 */
export const getAddMediumBoundAction = ({ 
    collection,
    collectionItemId
} : { 
    collection: ICollectionNames, 
    collectionItemId: string
}) => addMediaToItem.bind(null, collection, collectionItemId)

export const getDeleteMediumBoundAction = ({ 
    collection,
    mediumId
} : { 
    collection: ICollectionsWithMediaNames | ICollectionsWithMediumNames
    mediumId: string
}) => deleteMediaItem.bind(null, collection, mediumId)

