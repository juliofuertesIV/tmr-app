import { IActionTarget } from "@/types/forms";
import { contestFields } from "./collections/contests";
import { CollectionNames } from "@/types";
import { brandFields } from "./collections/brands";
import { socialFields } from "./collections/social";
import { inscriptionFields } from "./collections/inscriptions";
import { managerFields } from "./collections/managers";
import { sponsorFields } from "./collections/sponsors";
import { tagFields } from "./collections/tags";
import { tagCategoryFields } from "./collections/tagcategories";


export const getFieldsByCollectionAndActionTarget = ({ collection, actionTarget } : { collection: CollectionNames | 'contests' | 'inscriptions', actionTarget: IActionTarget }) => {
    
    if (actionTarget === 'delete') return []

    return fieldsByCollectionName[collection][actionTarget]
}

const fieldsByCollectionName = {
    contests: contestFields,
    brands: brandFields,
    social: socialFields,
    inscriptions: inscriptionFields,
    managers: managerFields,
    sponsors: sponsorFields,
    tags: tagFields,
    tagCategories: tagCategoryFields
}
