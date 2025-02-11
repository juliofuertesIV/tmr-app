import { CollectionNames } from "@/types"
import { GetCreationBoundFormAction, getCreationBoundFormActionByCollection, getDeleteBoundFormActionByCollection, GetDeleteFormAction, GetUpdateBoundFormAction, getUpdateBoundFormActionByCollection } from "./schema/actions"
import { IActionTarget, IFormField } from "@/types/forms"
import { getFieldsByCollectionAndActionTarget } from "./schema/fields"

type FormSchema = {
    fields: IFormField[],
    bindCreationAction: GetCreationBoundFormAction,
    bindUpdateAction: GetUpdateBoundFormAction,
    bindDeleteAction: GetDeleteFormAction
}

export const getFormSchema = ({ 
    collection,
    actionTarget 
} : { 
    collection: CollectionNames | 'contests' | 'inscriptions',
    actionTarget: IActionTarget 
}) : FormSchema => {

    return {
        fields: getFieldsByCollectionAndActionTarget({ collection, actionTarget }),
        bindCreationAction: getCreationBoundFormActionByCollection({ collection }),
        bindUpdateAction: getUpdateBoundFormActionByCollection({ collection }),
        bindDeleteAction: getDeleteBoundFormActionByCollection({ collection })
    }
}
