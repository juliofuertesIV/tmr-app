import { addCollectionItem, associateItems } from "@/lib/fetch/post/collections"
import { updateCollectionItem } from "@/lib/fetch/put/collections"
import { ICollectionNames } from "@/types"
import { IAssociationNames } from "@/types/associations"

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

export const getAssociationBoundInput = ({ 
    collection,
    collectionItemId,
    association
} : { 
    collection: ICollectionNames, 
    collectionItemId: string,
    association: IAssociationNames
}) => associateItems.bind(null, collection, collectionItemId, association)

