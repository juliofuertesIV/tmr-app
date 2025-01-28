import { addCollectionItem } from "@/lib/fetch/post/collections"
import { updateCollectionItem } from "@/lib/fetch/put/collections"
import { ICollectionNames } from "@/types"


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
