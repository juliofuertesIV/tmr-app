import { ICollectionNames } from "@/types"
import { CreationBoundFormAction, getBoundFormAction, UpdateBoundFormAction } from "./actions"
import { IActionTarget, IFormField } from "@/types/forms"
import { getFieldsByCollectionAndActionTarget } from "./fields"

type FormSchemasByCollection = {
    [key in ICollectionNames]: {
        getFields: ({ collection, actionTarget }: { collection: ICollectionNames; actionTarget: IActionTarget; }) => IFormField[],
        getAction: ({ actionTarget }: { actionTarget: IActionTarget }) => CreationBoundFormAction | UpdateBoundFormAction
    }
}

type FormSchema = {
    fields: IFormField[],
    action: CreationBoundFormAction | UpdateBoundFormAction,
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
        action: collectionsFormSchema[collection].getAction({ actionTarget }),
    }
}

export function formSchemaActionIsUpdateAction (
    action: CreationBoundFormAction | UpdateBoundFormAction,
    actionTarget: IActionTarget
) : action is UpdateBoundFormAction {

    return actionTarget === 'update'
}



/* 

TEST

const schema = getFormSchema({ collection: 'contests', actionTarget: 'update' })


if (formSchemaActionIsUpdateAction(schema.action, 'update')) {

    var contestId = 'asdfasdfad'

    schema.action({ id: contestId })

}
 */