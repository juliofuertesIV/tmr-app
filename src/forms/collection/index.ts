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

    const action = formsByCollectionName.action[actionTarget]

    const allFields = formsByCollectionName.fields[collection]

    if (actionTarget === 'creation') {
        const creationFields = allFields.filter(field => field.requiredForItemCreation)
        return { action, fields: creationFields }
    }

    return { action, fields: allFields }
}

export const getMediaFieldsByCollection = ({ collection } : { collection: IOneOfCollectionsWithMediaNames }) : IMediaFormField[] => {
    return mediaFieldsByCollectionName[collection]
}