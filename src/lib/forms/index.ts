import { ICollectionNames } from "@/types"
import { GetCreationBoundFormAction, GetUpdateBoundFormAction } from "./schema/actions"
import { IActionTarget, IFormField } from "@/types/forms"
import { formSchemasByCollection } from "./schema"

type FormSchema = {
    fields: IFormField[],
    bindCreationAction: GetCreationBoundFormAction,
    bindUpdateAction: GetUpdateBoundFormAction,
}

export const getFormSchema = ({ 
    collection,
    actionTarget 
} : { 
    collection: ICollectionNames,
    actionTarget: IActionTarget 
}) : FormSchema => {

    return {
        fields: formSchemasByCollection[collection].getFields({ collection, actionTarget }),
        bindCreationAction: formSchemasByCollection[collection].getItemCreationActionByCollection({ collection }),
        bindUpdateAction: formSchemasByCollection[collection].getItemUpdateActionByCollection({ collection }),
    }
}
