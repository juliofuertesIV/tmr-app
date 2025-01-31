import { IActionTarget } from "@/types/forms";
import { contestFields } from "./collections/contests";
import { ICollectionNames } from "@/types";
import { brandFields } from "./collections/brands";
import { socialFields } from "./collections/social";
import { genreFields } from "./collections/genres";
import { inscriptionFields } from "./collections/inscriptions";
import { managerFields } from "./collections/managers";
import { sponsorFields } from "./collections/sponsors";


export const getFieldsByCollectionAndActionTarget = ({ collection, actionTarget } : { collection: ICollectionNames, actionTarget: IActionTarget }) => {
    
    if (collection == 'media') return [] // TO DO

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
    media: []
}
/* 
export const mediaFieldsByCollectionName = {
    contests: contestsMediaFields,
    inscriptions: [],
    sponsors: [],
    managers: []
} as {
    [key in ICollectionsWithMediaNames]: IMediaFormField[]
}
 */
