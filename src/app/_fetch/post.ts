'use server'

import { IAssociationTypes, IOneOfCollectionNames } from "@/types"
import { IAPIResponse } from "@/types/api"
import { revalidateTag } from "next/cache"

export const addCollectionElement = async (
    collection: IOneOfCollectionNames,
    prevState: any,
    formData: FormData
) : Promise<IAPIResponse> => {
    
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

export const manageContestParams = async ({ 
    ContestId,
    ParamId,
    method 
} : { 
    ContestId: string | number,
    ParamId: string,
    method: 'POST' | 'DELETE'
}) : Promise<IAPIResponse> => {

    const res = await fetch(`http://localhost:3000/api/contestsparams`, {
        method,
        cache: 'no-cache',
        body: JSON.stringify({ ContestId, ParamId })
    })
    .then(async data => await data.json())
    .catch(error => error)

    revalidateTag('contests')
    return res
}

export const manageCollectionMedia = async (
    collection: IOneOfCollectionNames,
    elementId: string | number,
    prevState: any,
    formData: FormData
) : Promise<IAPIResponse> => {

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
    association: IAssociationTypes,
    prevState: any,
    formData: FormData
) : Promise<IAPIResponse> => {

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
