import { getAddCollectionItemBoundAction, getUpdateCollectionItemBoundAction } from "./collections/collections";
import { getAddManagerBoundAction, getUpdateManagerProfileBoundAction } from "./collections/managers";
import { getAddInscriptionBoundAction, getUpdateInscriptionBoundAction } from "./collections/inscriptions";
import { getAddContestBoundAction, getUpdateContestBoundAction } from "./collections/contests";
import { ICollectionNames } from "@/types";
import { IAPIResponse } from "@/types/api";

export type GetCreationBoundFormAction = () => (prevState: any, formData: FormData) => Promise<IAPIResponse<null>>
export type GetUpdateBoundFormAction = ({ id }: { id: string; }) => (prevState: any, formData: FormData) => Promise<IAPIResponse<null>>

type CreationFormActionByCollection = { [key in ICollectionNames | 'contests' | 'inscriptions']: GetCreationBoundFormAction }
type UpdateFormActionByCollection = { [key in ICollectionNames | 'contests' | 'inscriptions']: GetUpdateBoundFormAction }

const creation : CreationFormActionByCollection = {
    contests: () => getAddContestBoundAction(),
    inscriptions: () => getAddInscriptionBoundAction(),
    managers: () => getAddManagerBoundAction(),
    brands: () => getAddCollectionItemBoundAction({ collection: 'brands' }),
    genres: () => getAddCollectionItemBoundAction({ collection: 'genres' }),
    social: () => getAddCollectionItemBoundAction({ collection: 'social' }),
    sponsors: () => getAddCollectionItemBoundAction({ collection: 'sponsors' }),
    tagtypes: () => getAddCollectionItemBoundAction({ collection: 'tagtypes' }),
    tags: () => getAddCollectionItemBoundAction({ collection: 'tags' })
}

const update : UpdateFormActionByCollection = {
    contests: ({ id } : { id: string }) => getUpdateContestBoundAction({ id }),
    inscriptions: ({ id } : { id: string }) => getUpdateInscriptionBoundAction({ id }),
    managers: ({ id } : { id: string }) => getUpdateManagerProfileBoundAction({ id }),
    brands: ({ id } : { id: string }) => getUpdateCollectionItemBoundAction({ collection: 'brands', id: id }),
    genres: ({ id } : { id: string }) => getUpdateCollectionItemBoundAction({ collection: 'genres', id: id }),
    social: ({ id } : { id: string }) => getUpdateCollectionItemBoundAction({ collection: 'social', id: id }),
    sponsors: ({ id } : { id: string }) => getUpdateCollectionItemBoundAction({ collection: 'sponsors', id: id }),
    tagtypes: ({ id } : { id: string }) => getUpdateCollectionItemBoundAction({ collection: 'tagtypes', id: id }),
    tags: ({ id } : { id: string }) => getUpdateCollectionItemBoundAction({ collection: 'tags', id: id })
}

export const getCreationBoundFormActionByCollection = ({ 
        collection,
    } : { 
        collection: ICollectionNames | 'contests' | 'inscriptions'
    }
) : GetCreationBoundFormAction => {

    return creation[collection]

}

export const getUpdateBoundFormActionByCollection = ({ 
    collection,
} : { 
    collection: ICollectionNames | 'contests' | 'inscriptions',
}
) : GetUpdateBoundFormAction => {

    return update[collection]

}
