'use server'
    
import { IOneOfCollectionNames } from "@/types"
import { IAPIResponse } from "@/types/api"
import { IAssociationNames } from "@/types/associations"
import { revalidateTag } from "next/cache"

export const deleteCollectionItem = async (collection: IOneOfCollectionNames, itemId: string, prevState: any, formData: FormData) : Promise<IAPIResponse<null>> => {
    
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

export const deleteContestMediaItem = async ({ contestId, mediaId } : { contestId: string, mediaId: string }) : Promise<IAPIResponse<null>> => {
    
    const res = await fetch(`http://localhost:3000/api/contests/${ contestId }/media/${ mediaId }`, {
        method: "DELETE",
        cache: 'no-cache',
        body: JSON.stringify({ mediaId }),
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(async data => data.json())
    .catch(error => error)
    
    revalidateTag('contests')

    return res
}

export const disassociateItems = async (
    collection: IOneOfCollectionNames,
    collectionItemId: string | number,
    association: IAssociationNames,
    associationItemId: string | number,
    prevState: any,
    formData: FormData
) : Promise<IAPIResponse<null>> => {

    const res = await fetch(`http://localhost:3000/api/${ collection }/${ collectionItemId }/${ association }/${ associationItemId }`, {
        method: "DELETE",
        cache: 'no-cache'
    })
    .then(async data => await data.json())
    .catch(error => error)
    
    revalidateTag(collection)
    return res
}
