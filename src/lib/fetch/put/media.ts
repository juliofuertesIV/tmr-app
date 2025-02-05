'use server'
    
import { IAPIResponse } from "@/types/api"
import { ICollectionsWithMediumNames } from "@/types/media"
import { revalidateTag } from "next/cache"

export const updateCollectionItemMedium = async (
    collection: ICollectionsWithMediumNames,
    id: string,
    MediumId: string,
    prevState: any,
    formData: FormData
) : Promise<IAPIResponse<null>> => {
    
    const res = await fetch(`http://localhost:3000/api/protected/${ collection }/${ id }/medium/${ MediumId }`, {
        method: "PUT",
        cache: 'no-cache',
        body: formData
    })
    .then(async data => data.json())
    .catch(error => error)
    
    revalidateTag(collection)

    return res
}
