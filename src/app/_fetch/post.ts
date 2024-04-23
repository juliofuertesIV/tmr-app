'use server'

import { IOneOfCollectionNames } from "@/interfaces"
import { IAPIResponse } from "@/interfaces/forms"
import { revalidateTag } from "next/cache"

export const addCollectionElement = async (collection: IOneOfCollectionNames, prevState: any, formData: FormData) : Promise<IAPIResponse> => {

    const payload = Object.fromEntries(formData)

    console.log({ payload })

    const res = await fetch(`http://localhost:3000/api/${ collection }`, {
        method: "POST",
        cache: 'no-cache',
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(async data => data.json())
    .catch(error => error)
    
    console.log({ res })

    revalidateTag(collection)
    return res
}

export const addBrandToContest = async (id: string, prevState: any, payload: { brandId: string, removeBrandRelationship: false }) : Promise<IAPIResponse> => {
    const res = await fetch(`http://localhost:3000/api/contests/${ id }/brands/${ payload.brandId }`, {
        method: "POST",
        cache: 'no-cache',
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(async data => data.json())
    .catch(error => error)
    
    revalidateTag('contests')
    return res
}