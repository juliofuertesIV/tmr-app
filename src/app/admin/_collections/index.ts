import { IOneOfCollectionNames } from "@/types"
import { contestEditFormFields, mediaFieldsByCollection} from "./contests"
import { brandEditionFormFields } from "./brands"
import { addCollectionElement } from "@/app/_fetch/post"
import { updateCollectionItem } from "@/app/_fetch/put"
import { IEditionFormField, IFormAction } from "@/types/forms"

type IActionTarget = 'creation' | 'update'

const formsByCollectionName : IFormByCollectionName = {
    action: {
        creation: addCollectionElement,
        update: updateCollectionItem
    },
    fields: {
        contests: contestEditFormFields,
        brands: brandEditionFormFields,
        social: [] as IEditionFormField[],
    }
} 

type IFormByCollectionName = {
    action: { 
        [key in IActionTarget]: IFormAction
    },
    fields: {
        [key in IOneOfCollectionNames]: IEditionFormField[] 
    }
}

export const getFormByCollectionName = ({ collection, actionTarget } : { collection: IOneOfCollectionNames, actionTarget: IActionTarget }) : { action: IFormAction, fields: IEditionFormField[] } => {
    return {
        action: formsByCollectionName.action[actionTarget],
        fields: formsByCollectionName.fields[collection]
    }   
}

export const getMediaFieldsByCollection = ({ collection } : { collection: IOneOfCollectionNames }) => mediaFieldsByCollection[collection]