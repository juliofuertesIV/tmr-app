import { IOneOfCollectionNames } from "@/interfaces"
import { contestCreationForm, contestEditForm} from "./contests"
import { brandCreationForm, brandEditForm } from "./brands"
import { panelsByCollectionName } from "./panel/constructor"

const creationFormsByCollectionName = {
    contests: contestCreationForm,
    brands: brandCreationForm
}


const editionFormsByCollectionName = {
    contests: contestEditForm,
    brands: brandEditForm
}

export const getCreationFormByCollectionName = ({ 
    collection 
} : { 
    collection: IOneOfCollectionNames 
}) => creationFormsByCollectionName[collection]

export const getEditionFormByCollectionName = ({ 
    collection 
} : { 
    collection: IOneOfCollectionNames 
}) => editionFormsByCollectionName[collection]


export const getCollectionElementPanel = ({ 
    collection 
} : { 
    collection: IOneOfCollectionNames 
}) => panelsByCollectionName[collection]

