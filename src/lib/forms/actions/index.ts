import { getAddCollectionItemBoundAction, getUpdateCollectionItemBoundAction } from "./collections/collections";
import { getAddManagerBoundAction, getUpdateManagerProfileBoundAction } from "./collections/managers";
import { getAddInscriptionBoundAction, getUpdateInscriptionBoundAction } from "./collections/inscriptions";
import { getAddContestBoundAction, getUpdateContestBoundAction } from "./collections/contests";
import { ICollectionNames } from "@/types";
import { IActionTarget } from "@/types/forms";
import { IAPIResponse } from "@/types/api";

export type GetCreationBoundFormAction = (prevState: any, formData: FormData) => Promise<IAPIResponse<null>>
export type GetUpdateBoundFormAction = ({ id }: { id: string; }) => (prevState: any, formData: FormData) => Promise<IAPIResponse<null>>

type CreationFormActionByCollection = { [key in ICollectionNames]: () => GetCreationBoundFormAction }
type UpdateFormActionByCollection = { [key in ICollectionNames]: GetUpdateBoundFormAction }
type FormsByActionTarget = { [key in IActionTarget]: CreationFormActionByCollection | UpdateFormActionByCollection }

const creation : CreationFormActionByCollection = {
    contests: () => getAddContestBoundAction(),
    brands: () => getAddCollectionItemBoundAction({ collection: 'brands' }),
    social: () => getAddCollectionItemBoundAction({ collection: 'social' }),
    genres: () => getAddCollectionItemBoundAction({ collection: 'genres' }),
    inscriptions: () => getAddInscriptionBoundAction(),
    managers: () => getAddManagerBoundAction(),
    sponsors: () => getAddCollectionItemBoundAction({ collection: 'sponsors' }),
    media: () => getAddCollectionItemBoundAction({ collection: 'media' }),
}

const update : UpdateFormActionByCollection = {
    contests: ({ id } : { id: string }) => getUpdateContestBoundAction({ id }),
    brands: ({ id } : { id: string }) => getUpdateCollectionItemBoundAction({ collection: 'brands', id: id }),
    social: ({ id } : { id: string }) => getUpdateCollectionItemBoundAction({ collection: 'social', id: id }),
    genres: ({ id } : { id: string }) => getUpdateCollectionItemBoundAction({ collection: 'genres', id: id }),
    inscriptions: ({ id } : { id: string }) => getUpdateInscriptionBoundAction({ id }),
    managers: ({ id } : { id: string }) => getUpdateManagerProfileBoundAction({ id }),
    sponsors: ({ id } : { id: string }) => getUpdateCollectionItemBoundAction({ collection: 'brands', id: id }),
    media: ({ id } : { id: string }) => getUpdateCollectionItemBoundAction({ collection: 'media', id: id }),
}

const formActionsByActionTarget : FormsByActionTarget = {
    creation: creation,
    update: update
} 

export const getBoundFormAction = ({ 
        collection,
        actionTarget 
    } : { 
        collection: ICollectionNames,
        actionTarget: IActionTarget 
    }
) : GetCreationBoundFormAction | GetUpdateBoundFormAction => {

    return formActionsByActionTarget[actionTarget][collection]

}
