import { IOneOfCollectionNames } from "@/interfaces"
import { contestCreationForm, contestEditForm, mediaFieldsByCollection} from "./contests"
import { brandCreationForm, brandEditForm } from "./brands"

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

export const getMediaFieldsByCollection = ({ collection } : { collection: IOneOfCollectionNames }) => mediaFieldsByCollection[collection]