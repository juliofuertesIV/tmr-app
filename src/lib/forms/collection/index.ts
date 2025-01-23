import { ICollectionNames } from "@/types"
import { IActionTarget, IFormAction, IFormField, IMediaFormField } from "@/types/forms"
import { formsByCollectionName, mediaFieldsByCollectionName } from "./fields"
import { collectionHasMedia } from "@/app/api/[collection]/_utils"

type FormByCollectionNameProps = {
    collection: ICollectionNames,
    actionTarget: IActionTarget
}

type FormByCollectionName = (
    { collection, actionTarget } : FormByCollectionNameProps
) => { action: IFormAction, fields: IFormField[] }

export const getFormByCollectionName : FormByCollectionName = ({ collection, actionTarget }) => {

    const action = formsByCollectionName.action[actionTarget]

    console.log({ action, collection })

    const allFields = formsByCollectionName.fields[collection]

    if (actionTarget === 'creation') {
        const creationFields = allFields.filter(field => field.requiredForItemCreation)
        return { action, fields: creationFields }
    }

    return { action, fields: allFields }
}

export const getMediaFieldsByCollection = ({ collection } : { collection: ICollectionNames }) : IMediaFormField[] => {

    if (!collectionHasMedia(collection)) return []

    return mediaFieldsByCollectionName[collection]
}