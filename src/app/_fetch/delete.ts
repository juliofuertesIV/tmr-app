'use server'
    
import { IContestMediaRole, IOneOfCollectionNames } from "@/interfaces"
import { IAPIResponse } from "@/interfaces/api"
import { revalidateTag } from "next/cache"

export const deleteCollectionItem = async (collection: IOneOfCollectionNames, itemId: string, prevState: any, formData: FormData) : Promise<IAPIResponse> => {
    
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

export const deleteContestMediaItem = async ({ contestId, mediaId, role } : { contestId: string, mediaId: string, role: IContestMediaRole }) : Promise<IAPIResponse> => {
    
    const res = await fetch(`http://localhost:3000/api/contests/${ contestId }/media/${ mediaId }`, {
        method: "DELETE",
        cache: 'no-cache',
        body: JSON.stringify({ mediaId, role }),
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(async data => data.json())
    .catch(error => error)
    
    revalidateTag('contests')

    return res
}