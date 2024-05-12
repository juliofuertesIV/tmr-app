'use server'
    
import { IOneOfCollectionNames } from "@/interfaces"
import { IAPIResponse } from "@/interfaces/api"
import { revalidateTag } from "next/cache"

export const updateCollectionItem = async (collection: IOneOfCollectionNames, itemId: string, prevState: any, formData: FormData) : Promise<IAPIResponse> => {
    
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