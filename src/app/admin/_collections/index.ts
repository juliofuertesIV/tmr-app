import { IOneOfCollectionNames } from "@/interfaces"
import { contestCreationForm, contestEditForm} from "./contests"
import { brandCreationForm, brandEditForm } from "./brands"
import { itemPanelsByCollectionName, panelsByCollectionName } from "./panel/constructor"

const creationFormsByCollectionName = {
    contests: contestCreationForm,
    brands: brandCreationForm
}

const editionFormsByCollectionName = {
    contests: contestEditForm,
    brands: brandEditForm
}

export const getCreationFormByCollectionName = ({ collection } : { collection: IOneOfCollectionNames }) => creationFormsByCollectionName[collection]

export const getEditionFormByCollectionName = ({ collection } : { collection: IOneOfCollectionNames }) => editionFormsByCollectionName[collection]

export const getCollectionItemPanelByCollectionName = ({ collection } : { collection: IOneOfCollectionNames }) => itemPanelsByCollectionName[collection]

export const getCollectionPanelByCollectionName = ({ collection } : { collection: IOneOfCollectionNames }) => panelsByCollectionName[collection]