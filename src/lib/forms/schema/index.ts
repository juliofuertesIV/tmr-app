import { ICollectionNames } from "@/types";
import { IActionTarget, IFormField } from "@/types/forms";
import { GetCreationBoundFormAction, getCreationBoundFormActionByCollection, GetUpdateBoundFormAction, getUpdateBoundFormActionByCollection } from "./actions";
import { getFieldsByCollectionAndActionTarget } from "./fields";

type FormSchemasByCollection = {
    [key in ICollectionNames | 'contests' | 'inscriptions' | 'media']: {
        getFields: ({ collection, actionTarget }: { collection: ICollectionNames; actionTarget: IActionTarget; }) => IFormField[],
        getItemCreationActionByCollection: ({ collection } : { collection: ICollectionNames }) => GetCreationBoundFormAction
        getItemUpdateActionByCollection: ({ collection } : { collection: ICollectionNames }) => GetUpdateBoundFormAction
    }
}

/* 
TO DO: 
export const getContestFormSchema;
export const getAddInscriptionFormSchemaByCollectionParams; 
*/

export const formSchemasByCollection : FormSchemasByCollection = {
    brands: {
        getFields: ({ collection, actionTarget }) => getFieldsByCollectionAndActionTarget({ collection, actionTarget }),
        getItemCreationActionByCollection: ({ collection }) => getCreationBoundFormActionByCollection({ collection }),
        getItemUpdateActionByCollection: ({ collection }) => getUpdateBoundFormActionByCollection({ collection })
    },
    contests: {
        getFields: ({ collection, actionTarget }) => getFieldsByCollectionAndActionTarget({ collection, actionTarget }),
        getItemCreationActionByCollection: ({ collection }) => getCreationBoundFormActionByCollection({ collection }),
        getItemUpdateActionByCollection: ({ collection }) => getUpdateBoundFormActionByCollection({ collection })
    },
    genres: {
        getFields: ({ collection, actionTarget }) => getFieldsByCollectionAndActionTarget({ collection, actionTarget }),
        getItemCreationActionByCollection: ({ collection }) => getCreationBoundFormActionByCollection({ collection }),
        getItemUpdateActionByCollection: ({ collection }) => getUpdateBoundFormActionByCollection({ collection })
    },
    inscriptions: {
        getFields: ({ collection, actionTarget }) => getFieldsByCollectionAndActionTarget({ collection, actionTarget }),
        getItemCreationActionByCollection: ({ collection }) => getCreationBoundFormActionByCollection({ collection }),
        getItemUpdateActionByCollection: ({ collection }) => getUpdateBoundFormActionByCollection({ collection })
    },
    managers: {
        getFields: ({ collection, actionTarget }) => getFieldsByCollectionAndActionTarget({ collection, actionTarget }),
        getItemCreationActionByCollection: ({ collection }) => getCreationBoundFormActionByCollection({ collection }),
        getItemUpdateActionByCollection: ({ collection }) => getUpdateBoundFormActionByCollection({ collection })
    },
    social: {
        getFields: ({ collection, actionTarget }) => getFieldsByCollectionAndActionTarget({ collection, actionTarget }),
        getItemCreationActionByCollection: ({ collection }) => getCreationBoundFormActionByCollection({ collection }),
        getItemUpdateActionByCollection: ({ collection }) => getUpdateBoundFormActionByCollection({ collection })
    },
    sponsors: {
        getFields: ({ collection, actionTarget }) => getFieldsByCollectionAndActionTarget({ collection, actionTarget }),
        getItemCreationActionByCollection: ({ collection }) => getCreationBoundFormActionByCollection({ collection }),
        getItemUpdateActionByCollection: ({ collection }) => getUpdateBoundFormActionByCollection({ collection })
    },
    media: {
        getFields: ({ collection, actionTarget }) => getFieldsByCollectionAndActionTarget({ collection, actionTarget }),
        getItemCreationActionByCollection: ({ collection }) => getCreationBoundFormActionByCollection({ collection }),
        getItemUpdateActionByCollection: ({ collection }) => getUpdateBoundFormActionByCollection({ collection })
    }
}   