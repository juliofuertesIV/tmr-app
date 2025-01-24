'use server'

import { ICollectionNames } from "@/types"
import { IAPIResponse } from "@/types/api"
import { IAssociationNames } from "@/types/associations"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export const addCollectionElement = async (
    collection: ICollectionNames,
    prevState: any,
    formData: FormData
) : Promise<IAPIResponse<null>> => {

    let creationAPIUrl;

    creationAPIUrl = collection === 'managers' ? `http://localhost:3000/api/auth/managers` : `http://localhost:3000/api/${ collection }`

    if (collection === 'media') {
        creationAPIUrl = `http://localhost:3000/api/media`
    }

    console.log({ creationAPIUrl })

    const res = await fetch(creationAPIUrl, {
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
    collection: ICollectionNames,
    collectionItemId: string | number,
    association: IAssociationNames,
    prevState: any,
    formData: FormData
) : Promise<IAPIResponse<null>> => {

    // TO DO: VALIDATE if (association === 'states') { // ACTUALLY UPDATE CONTEST STATE separate function

    const res = await fetch(`http://localhost:3000/api/${ collection }/${ collectionItemId }/${ association }`, {
        method: "POST",
        cache: 'no-cache',
        body: formData,
    })
    .then(data => data)
    .then(async data => await data.json())
    .catch(error => error)
    
    revalidateTag(collection)
    revalidateTag(association)
    return res

}

export const addMediaToItem = async (
    collection: ICollectionNames,
    id: string | number,
    prevState: any,
    formData: FormData
) : Promise<IAPIResponse<null>> => {

    const res = await fetch(`http://localhost:3000/api/${ collection }/${ id }/medium`, {
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
    collection: ICollectionNames,
    id: string | number,
    prevState: any,
    formData: FormData
) : Promise<IAPIResponse<null>> => {

    const res = await fetch(`http://localhost:3000/api/${ collection }/${ id }/media`, {
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

export const login = async (
    prevState: any,
    formData: FormData
) : Promise<IAPIResponse<null>> => {


    const res = await fetch(`http://localhost:3000/api/auth/login`, {
        method: "POST",
        cache: 'no-cache',
        body: formData
    })
    .then(async (data) => {

        const response = await data.json()

        if (response.success) {
            
            const { session } = response.data
            
            cookies().set(
                'session',
                session,
                { 
                    secure: true,
                    maxAge: 1000 * 60 * 60 * 72,
                    domain: 'localhost',
                    httpOnly: true 
                }
            )
        }

        return response
    })
    .catch(error => error)
    
    return res

} 