import { ICollectionNames } from "@/types"
import { GetCreationBoundFormAction, getCreationBoundFormActionByCollection, GetUpdateBoundFormAction, getUpdateBoundFormActionByCollection } from "./schema/actions"
import { IActionTarget, IFormField } from "@/types/forms"
import { getFieldsByCollectionAndActionTarget } from "./schema/fields"

type FormSchema = {
    fields: IFormField[],
    bindCreationAction: GetCreationBoundFormAction,
    bindUpdateAction: GetUpdateBoundFormAction,
}

export const getFormSchema = ({ 
    collection,
    actionTarget 
} : { 
    collection: ICollectionNames | 'contests' | 'inscriptions',
    actionTarget: IActionTarget 
}) : FormSchema => {

    return {
        fields: getFieldsByCollectionAndActionTarget({ collection, actionTarget }),
        bindCreationAction: getCreationBoundFormActionByCollection({ collection }),
        bindUpdateAction: getUpdateBoundFormActionByCollection({ collection }),
    }
}
