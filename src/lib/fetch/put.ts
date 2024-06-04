'use server'
    
import { ICollectionNames } from "@/lib/types"
import { IAPIResponse } from "@/lib/types/api"
import { revalidateTag } from "next/cache"

export const updateCollectionItem = async (collection: ICollectionNames, itemId: string, prevState: any, formData: FormData) : Promise<IAPIResponse<null>> => {
    
    const res = await fetch(`http://localhost:3000/api/${ collection }/${ itemId }`, {
        method: "PUT",
        cache: 'no-cache',
        body: formData
    })
    .then(async data => data.json())
    .catch(error => error)
    
    revalidateTag(collection)

    return res
}