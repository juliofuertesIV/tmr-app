import { ICollectionNames } from "@/types"
import { GetCreationBoundFormAction, getBoundFormAction, GetUpdateBoundFormAction } from "./actions"
import { IActionTarget, IFormField } from "@/types/forms"
import { getFieldsByCollectionAndActionTarget } from "./fields"

type FormSchemasByCollection = {
    [key in ICollectionNames]: {
        getFields: ({ collection, actionTarget }: { collection: ICollectionNames; actionTarget: IActionTarget; }) => IFormField[],
        getAction: ({ actionTarget }: { actionTarget: IActionTarget }) => GetCreationBoundFormAction | GetUpdateBoundFormAction
    }
}

type FormSchema = {
    fields: IFormField[],
    getBoundAction: GetCreationBoundFormAction | GetUpdateBoundFormAction,
}

const collectionsFormSchema : FormSchemasByCollection = {
    brands: {
        getFields: ({ collection, actionTarget } : { collection: ICollectionNames, actionTarget: IActionTarget }) => getFieldsByCollectionAndActionTarget({ collection, actionTarget }),
        getAction: ({ actionTarget } : { actionTarget: IActionTarget }) => getBoundFormAction({ collection: 'brands', actionTarget })
    },
    contests: {
        getFields: ({ collection, actionTarget } : { collection: ICollectionNames, actionTarget: IActionTarget }) => getFieldsByCollectionAndActionTarget({ collection, actionTarget }),
        getAction: ({ actionTarget } : { actionTarget: IActionTarget }) => getBoundFormAction({ collection: 'contests', actionTarget })
    },
    genres: {
        getFields: ({ collection, actionTarget } : { collection: ICollectionNames, actionTarget: IActionTarget }) => getFieldsByCollectionAndActionTarget({ collection, actionTarget }),
        getAction: ({ actionTarget } : { actionTarget: IActionTarget }) => getBoundFormAction({ collection: 'genres', actionTarget })
    },
    inscriptions: {
        getFields: ({ collection, actionTarget } : { collection: ICollectionNames, actionTarget: IActionTarget }) => getFieldsByCollectionAndActionTarget({ collection, actionTarget }),
        getAction: ({ actionTarget } : { actionTarget: IActionTarget }) => getBoundFormAction({ collection: 'contests', actionTarget })
    },
    managers: {
        getFields: ({ collection, actionTarget } : { collection: ICollectionNames, actionTarget: IActionTarget }) => getFieldsByCollectionAndActionTarget({ collection, actionTarget }),
        getAction: ({ actionTarget } : { actionTarget: IActionTarget }) => getBoundFormAction({ collection: 'contests', actionTarget })
    },
    social: {
        getFields: ({ collection, actionTarget } : { collection: ICollectionNames, actionTarget: IActionTarget }) => getFieldsByCollectionAndActionTarget({ collection, actionTarget }),
        getAction: ({ actionTarget } : { actionTarget: IActionTarget }) => getBoundFormAction({ collection: 'social', actionTarget })
    },
    sponsors: {
        getFields: ({ collection, actionTarget } : { collection: ICollectionNames, actionTarget: IActionTarget }) => getFieldsByCollectionAndActionTarget({ collection, actionTarget }),
        getAction: ({ actionTarget } : { actionTarget: IActionTarget }) => getBoundFormAction({ collection: 'sponsors', actionTarget })
    },
    media: {
        getFields: ({ collection, actionTarget } : { collection: ICollectionNames, actionTarget: IActionTarget }) => getFieldsByCollectionAndActionTarget({ collection, actionTarget }),
        getAction: ({ actionTarget } : { actionTarget: IActionTarget }) => getBoundFormAction({ collection: 'media', actionTarget })
    }
}

export const getFormSchema = ({ collection, actionTarget } : { collection: ICollectionNames, actionTarget: IActionTarget }) : FormSchema => {

    return {
        fields: collectionsFormSchema[collection].getFields({ collection, actionTarget }),
        getBoundAction: collectionsFormSchema[collection].getAction({ actionTarget }),
    }
}

export function formSchemaActionIsUpdateAction (
    action: GetCreationBoundFormAction | GetUpdateBoundFormAction,
    actionTarget: IActionTarget
) : action is GetUpdateBoundFormAction {

    return actionTarget === 'update'
}


/* 


TEST


const schema = getFormSchema({ collection: 'contests', actionTarget: 'update' })


if (formSchemaActionIsUpdateAction(schema.getBoundAction, 'update')) {

    var contestId = 'asdfasdfad'

    const boundAction = schema.getBoundAction({ id: contestId })

}
 */