import { IOneOfCollectionNames } from "@/interfaces"
import { contestCreationForm, contestEditForm } from "./contests"
import { brandCreationForm, brandEditForm } from "./brands"

const creationFormsByCollectionName = {
    contests: contestCreationForm,
    brands: brandCreationForm
}

const editionFormsByCollectionName = {
    contests: contestEditForm,
    brands: brandEditForm
}

export const getCreationformByCollectionName = ({ collection } : { collection: IOneOfCollectionNames }) => creationFormsByCollectionName[collection]

export const getEditionFormByCollectionName = ({ collection } : { collection: IOneOfCollectionNames }) => editionFormsByCollectionName[collection]
