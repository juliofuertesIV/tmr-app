import { IFormByCollectionName, IMediaFormField } from "@/types/forms";
import { contestFields, contestsMediaFields } from "./contests";
import { brandFields } from "./brands";
import { socialFields } from "./social";
import { genreFields } from "./genres";
import { managerFields } from "./managers";
import { addCollectionElement } from "@/lib/fetch/post";
import { updateCollectionItem } from "@/lib/fetch/put";
import { inscriptionFields } from "./inscriptions";
import { ICollectionsWithMediaNames } from "@/types/media";
import { sponsorFields } from "./sponsors";

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
        managers: managerFields,
        sponsors: sponsorFields,
        media: []
    }
} 

export const mediaFieldsByCollectionName = {
    contests: contestsMediaFields,
    inscriptions: [],
    sponsors: [],
    managers: []
} as {
    [key in ICollectionsWithMediaNames]: IMediaFormField[]
}
