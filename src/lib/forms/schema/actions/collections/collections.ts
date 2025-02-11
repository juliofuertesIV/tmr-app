
import { deleteCollectionItem } from "@/lib/fetch/delete/collections"
import { deleteMediaItem } from "@/lib/fetch/delete/media"
import { addCollectionItem } from "@/lib/fetch/post/collections"
import { addMediaToItem } from "@/lib/fetch/post/media"
import { updateCollectionItem } from "@/lib/fetch/put/collections"
import { CollectionNames } from "@/types"

export const getUpdateCollectionItemBoundAction = ({ 
    collection,
    id
} : { 
    collection: CollectionNames, 
    id: string 
}) => updateCollectionItem.bind(null, collection, id)

export const getAddCollectionItemBoundAction = ({ 
    collection,
} : { 
    collection: CollectionNames, 
}) => addCollectionItem.bind(null, collection)

export const getDeleteCollectionItemBoundAction = ({ 
    collection,
    id
} : { 
    collection: CollectionNames | 'contests' | 'inscriptions', 
    id: string 
}) => deleteCollectionItem.bind(null, collection, id)


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
    collection: 'contests' | 'managers' | 'sponsors' | 'inscriptions',
    collectionItemId: string
}) => addMediaToItem.bind(null, collection, collectionItemId)

export const getDeleteMediumBoundAction = ({ 
    collection,
    mediumId
} : { 
    collection: 'contests' | 'managers' | 'sponsors' | 'inscriptions'
    mediumId: string
}) => deleteMediaItem.bind(null, collection, mediumId)

