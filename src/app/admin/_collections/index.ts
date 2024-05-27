import { IOneOfCollectionNames, IOneOfCollectionsWithMediaNames } from "@/types"
import { IActionTarget, IFormAction, IFormField, IMediaFormField } from "@/types/forms"
import { formsByCollectionName, mediaFieldsByCollectionName } from "./fields"

type FormByCollectionNameProps = {
    collection: IOneOfCollectionNames,
    actionTarget: IActionTarget
}

type FormByCollectionName = (
    { collection, actionTarget } : FormByCollectionNameProps
) => { action: IFormAction, fields: IFormField[] }

export const getFormByCollectionName : FormByCollectionName = ({ collection, actionTarget }) => {
    return {
        action: formsByCollectionName.action[actionTarget],
        fields: formsByCollectionName.fields[collection][actionTarget]
    }
}

export const getMediaFieldsByCollection = ({ collection } : { collection: IOneOfCollectionsWithMediaNames }) : IMediaFormField[] => {
    return mediaFieldsByCollectionName[collection]
}