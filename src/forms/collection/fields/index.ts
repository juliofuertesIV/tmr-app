import { IFormByCollectionName, IMediaFormField } from "@/types/forms";
import { contestFields, contestsMediaFields } from "./contests";
import { brandFields } from "./brands";
import { socialFields } from "./social";
import { genreFields } from "./genres";
import { managerFields } from "./managers";
import { IOneOfCollectionsWithMediaNames } from "@/types";
import { addCollectionElement } from "@/fetch/post";
import { updateCollectionItem } from "@/fetch/put";
import { inscriptionFields } from "./inscriptions";

export const formsByCollectionName : IFormByCollectionName = {
    action: {
        creation: addCollectionElement,
        update: updateCollectionItem
    },
    fields: {
        contests: contestFields,
        brands: brandFields,
        social: socialFields,
        genres: genreFields,
        inscriptions: inscriptionFields,
        managers: managerFields
    }
} 

export const mediaFieldsByCollectionName = {
    contests: contestsMediaFields,
    inscriptions: []
} as {
    [key in IOneOfCollectionsWithMediaNames]: IMediaFormField[]
}
