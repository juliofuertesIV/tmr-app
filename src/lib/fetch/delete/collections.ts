'use server'
    
import { ICollectionNames } from "@/types"
import { IAPIResponse } from "@/types/api"
import { revalidateTag } from "next/cache"

export const deleteCollectionItem = async (collection: ICollectionNames, itemId: string, prevState: any, formData: FormData) : Promise<IAPIResponse<null>> => {
    
    const payload = Object.fromEntries(formData)

    const res = await fetch(`http://localhost:3000/api/${ collection }/${ itemId }`, {
        method: "DELETE",
        cache: 'no-cache',
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(async data => data.json())
    .catch(error => error)
    
    revalidateTag(collection)

    return res
}

