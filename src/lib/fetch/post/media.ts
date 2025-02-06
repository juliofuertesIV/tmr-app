'use server'

import { IAPIResponse } from "@/types/api"
import { revalidateTag } from "next/cache"

export const addMediaToItem = async (
    collection: 'contests' | 'managers' | 'sponsors' | 'inscriptions',
    id: string | number,
    prevState: any,
    formData: FormData
) : Promise<IAPIResponse<null>> => {

    const res = await fetch(`http://localhost:3000/api/protected/${ collection }/${ id }/medium`, {
        method: "POST",
        cache: 'no-cache',
        body: formData,
    })
    .then(data => data)
    .then(async data => await data.json())
    .catch(error => error)
    
    revalidateTag(collection)
    return res

}

export const associateMediaToItem = async (
    collection: 'contests' | 'managers' | 'sponsors' | 'inscriptions',
    id: string | number,
    prevState: any,
    formData: FormData
) : Promise<IAPIResponse<null>> => {

    const res = await fetch(`http://localhost:3000/api/protected/${ collection }/${ id }/media`, {
        method: "POST",
        cache: 'no-cache',
        body: formData,
    })
    .then(data => data)
    .then(async data => await data.json())
    .catch(error => error)
    
    revalidateTag(collection)
    return res

}
