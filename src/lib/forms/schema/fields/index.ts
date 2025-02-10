import { IActionTarget } from "@/types/forms";
import { contestFields } from "./collections/contests";
import { ICollectionNames } from "@/types";
import { brandFields } from "./collections/brands";
import { socialFields } from "./collections/social";
import { genreFields } from "./collections/genres";
import { inscriptionFields } from "./collections/inscriptions";
import { managerFields } from "./collections/managers";
import { sponsorFields } from "./collections/sponsors";
import { tagFields } from "./collections/tags";
import { tagtypeFields } from "./collections/tagtypes";


export const getFieldsByCollectionAndActionTarget = ({ collection, actionTarget } : { collection: ICollectionNames | 'contests' | 'inscriptions', actionTarget: IActionTarget }) => {
    
    if (actionTarget === 'delete') return []

    return fieldsByCollectionName[collection][actionTarget]
}

const fieldsByCollectionName = {
    contests: contestFields,
    brands: brandFields,
    social: socialFields,
    genres: genreFields,
    inscriptions: inscriptionFields,
    managers: managerFields,
    sponsors: sponsorFields,
    tags: tagFields,
    tagtypes: tagtypeFields
}
