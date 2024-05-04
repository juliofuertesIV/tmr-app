import { IOneOfCollectionNames } from "@/interfaces"
import { contestCreationForm, contestEditForm, contestPanel } from "./contests"
import { brandCreationForm, brandEditForm, brandPanel } from "./brands"

const creationFormsByCollectionName = {
    contests: contestCreationForm,
    brands: brandCreationForm
}

const editionFormsByCollectionName = {
    contests: contestEditForm,
    brands: brandEditForm
}

const panelByCollectionName = {
    contests: contestPanel,
    brands: brandPanel
}

export const getCreationformByCollectionName = ({ collection } : { collection: IOneOfCollectionNames }) => creationFormsByCollectionName[collection]

export const getEditionFormByCollectionName = ({ collection } : { collection: IOneOfCollectionNames }) => editionFormsByCollectionName[collection]

export const getPanelByCollectionName = ({ collection } : { collection: IOneOfCollectionNames }) => panelByCollectionName[collection]
