import { IFormByCollectionName, IMediaFormField } from "@/types/forms";
import { contestFields, contestsMediaFields } from "./contests";
import { brandFields } from "./brands";
import { socialFields } from "./social";
import { genreFields } from "./genres";
import { managerFields } from "./managers";
import { addCollectionElement, addMediaToItem } from "@/lib/fetch/post";
import { updateCollectionItem, updateCollectionItemMedium, updateManagerProfile } from "@/lib/fetch/put";
import { inscriptionFields } from "./inscriptions";
import { ICollectionsWithMediaNames } from "@/types/media";
import { sponsorFields } from "./sponsors";
import { deleteMediaItem } from "@/lib/fetch/delete";

export const formsByCollectionName : IFormByCollectionName = {
    action: {
        creation: addCollectionElement,
        update: updateCollectionItem,
        addMedia: addMediaToItem,
        deleteMedia: deleteMediaItem,
        updateMedia: updateCollectionItemMedium,
        updateManager: updateManagerProfile
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
