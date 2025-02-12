import { getAddCollectionItemBoundAction, getDeleteCollectionItemBoundAction, getUpdateCollectionItemBoundAction } from "./collections/collections";
import { getAddManagerBoundAction, getUpdateManagerProfileBoundAction } from "./collections/managers";
import { getAddInscriptionBoundAction, getUpdateInscriptionBoundAction } from "./collections/inscriptions";
import { getAddContestBoundAction, getUpdateContestBoundAction } from "./collections/contests";
import { CollectionNames } from "@/types";
import { IAPIResponse } from "@/types/api";

export type GetCreationBoundFormAction = () => (prevState: any, formData: FormData) => Promise<IAPIResponse<null>>
export type GetUpdateBoundFormAction = ({ id }: { id: string; }) => (prevState: any, formData: FormData) => Promise<IAPIResponse<null>>
export type GetDeleteFormAction = ({ id }: { id: string; }) => (prevState: any, formData: FormData) => Promise<IAPIResponse<null>>

type CreationFormActionByCollection = { [key in CollectionNames | 'contests' | 'inscriptions']: GetCreationBoundFormAction }
type UpdateFormActionByCollection = { [key in CollectionNames | 'contests' | 'inscriptions']: GetUpdateBoundFormAction }
type DeleteFormActionByCollection = { [key in CollectionNames | 'contests' | 'inscriptions']: GetDeleteFormAction }

const creationActions : CreationFormActionByCollection = {
    contests: () => getAddContestBoundAction(),
    inscriptions: () => getAddInscriptionBoundAction(),
    managers: () => getAddManagerBoundAction(),
    brands: () => getAddCollectionItemBoundAction({ collection: 'brands' }),
    social: () => getAddCollectionItemBoundAction({ collection: 'social' }),
    sponsors: () => getAddCollectionItemBoundAction({ collection: 'sponsors' }),
    tagCategories: () => getAddCollectionItemBoundAction({ collection: 'tagCategories' }),
    tags: () => getAddCollectionItemBoundAction({ collection: 'tags' })
}

const updateActions : UpdateFormActionByCollection = {
    contests: ({ id } : { id: string }) => getUpdateContestBoundAction({ id }),
    inscriptions: ({ id } : { id: string }) => getUpdateInscriptionBoundAction({ id }),
    managers: ({ id } : { id: string }) => getUpdateManagerProfileBoundAction({ id }),
    brands: ({ id } : { id: string }) => getUpdateCollectionItemBoundAction({ collection: 'brands', id }),
    social: ({ id } : { id: string }) => getUpdateCollectionItemBoundAction({ collection: 'social', id }),
    sponsors: ({ id } : { id: string }) => getUpdateCollectionItemBoundAction({ collection: 'sponsors', id }),
    tagCategories: ({ id } : { id: string }) => getUpdateCollectionItemBoundAction({ collection: 'tagCategories', id }),
    tags: ({ id } : { id: string }) => getUpdateCollectionItemBoundAction({ collection: 'tags', id })
}

const deleteActions : DeleteFormActionByCollection = {
    contests: ({ id } : { id: string }) => getDeleteCollectionItemBoundAction({ collection: 'contests', id }),
    inscriptions: ({ id } : { id: string }) => getDeleteCollectionItemBoundAction({ collection: 'inscriptions', id }),
    managers: ({ id } : { id: string }) => getDeleteCollectionItemBoundAction({ collection: 'managers', id }),
    brands: ({ id } : { id: string }) => getDeleteCollectionItemBoundAction({ collection: 'brands', id }),
    social: ({ id } : { id: string }) => getDeleteCollectionItemBoundAction({ collection: 'social', id }),
    sponsors: ({ id } : { id: string }) => getDeleteCollectionItemBoundAction({ collection: 'sponsors', id }),
    tagCategories: ({ id } : { id: string }) => getDeleteCollectionItemBoundAction({ collection: 'tagCategories', id }),
    tags: ({ id } : { id: string }) => getDeleteCollectionItemBoundAction({ collection: 'tags', id })
}

export const getCreationBoundFormActionByCollection = ({ 
        collection,
    } : { 
        collection: CollectionNames | 'contests' | 'inscriptions'
    }
) : GetCreationBoundFormAction => {

    return creationActions[collection]

}

export const getUpdateBoundFormActionByCollection = ({ 
    collection,
} : { 
    collection: CollectionNames | 'contests' | 'inscriptions',
}
) : GetUpdateBoundFormAction => {
    
    return updateActions[collection]
    
}

export const getDeleteBoundFormActionByCollection = ({
    collection
} : {
    collection: CollectionNames | 'contests' | 'inscriptions',
}) => {
    return deleteActions[collection]
}
