import { IOneOfCollectionNames, IOneOfCollectionsWithMediaNames } from "@/types"
import { contestFields, mediaFieldsByCollection} from "./contests"
import { addCollectionElement } from "@/app/_fetch/post"
import { updateCollectionItem } from "@/app/_fetch/put"
import { IFormField, IFormAction, IActionTarget } from "@/types/forms"
import { brandFields } from "./brands"
import { genreFields } from "./genres"

const formsByCollectionName : IFormByCollectionName = {
    action: {
        creation: addCollectionElement,
        update: updateCollectionItem
    },
    fields: {
        contests: contestFields,
        brands: brandFields,
        social: { creation: [], update: [] },
        genres: genreFields,
        inscriptions: { creation: [], update: [] },
        managers: { creation: [], update: [] }
    }
} 

type IFormByCollectionName = {
    action: { 
        [key in IActionTarget]: IFormAction
    },
    fields: {
        [key in IOneOfCollectionNames]: {
           [key in IActionTarget]: IFormField[] 
        }
    }
}

export const getFormByCollectionName = ({ 
    collection,
    actionTarget 
} : { 
    collection: IOneOfCollectionNames,
    actionTarget: IActionTarget 
}) => {
    return {
        action: formsByCollectionName.action[actionTarget],
        fields: formsByCollectionName.fields[collection][actionTarget]
    } as {
        action: IFormAction,
        fields: IFormField[] 
    }
}

export const getMediaFieldsByCollection = ({ collection } : { collection: IOneOfCollectionsWithMediaNames }) => mediaFieldsByCollection[collection]