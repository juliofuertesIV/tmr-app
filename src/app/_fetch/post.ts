'use server'

import { IOneOfCollectionNames } from "@/types"
import { IAPIResponse } from "@/types/api"
import { IAssociationNames } from "@/types/associations"
import { revalidateTag } from "next/cache"

export const addCollectionElement = async (
    collection: IOneOfCollectionNames,
    prevState: any,
    formData: FormData
) : Promise<IAPIResponse<null>> => {
    
    const payload = Object.fromEntries(formData)

    const res = await fetch(`http://localhost:3000/api/${ collection }`, {
        method: "POST",
        cache: 'no-cache',
        body: JSON.stringify(payload)
    })
    .then(async data => await data.json())
    .catch(error => error)
    
    revalidateTag(collection)
    return res
}

export const manageCollectionMedia = async (
    collection: IOneOfCollectionNames,
    elementId: string | number,
    prevState: any,
    formData: FormData
) : Promise<IAPIResponse<null>> => {

    const res = await fetch(`http://localhost:3000/api/${ collection }/${ elementId }/media`, {
        method: "POST",
        cache: 'no-cache',
        body: formData
    })
    .then(async data => await data.json())
    .catch(error => error)
    
    revalidateTag(collection)
    return res
}

export const associateItems = async (
    collection: IOneOfCollectionNames,
    collectionItemId: string | number,
    association: IAssociationNames,
    prevState: any,
    formData: FormData
) : Promise<IAPIResponse<null>> => {

    const res = await fetch(`http://localhost:3000/api/${ collection }/${ collectionItemId }/${ association }`, {
        method: "POST",
        cache: 'no-cache',
        body: formData
    })
    .then(async data => await data.json())
    .catch(error => error)
    
    revalidateTag(collection)
    return res

}
