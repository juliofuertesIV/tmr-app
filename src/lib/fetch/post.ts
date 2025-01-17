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

    const creationAPIUrl = collection === 'managers' ? `http://localhost:3000/api/auth/managers` : `http://localhost:3000/api/${ collection }`

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

    /* TO DO: VALIDATE if (association === 'states') {
        await fetch(`http://localhost:3000/api/validate/${ collection }/${ collectionItemId }`, {
            method: 'GET',
            cache: 'no-cache'
        })
        .then(async res => await res.json())
        .then((data: IAPIResponse<null>) => {
            if (!data.success) {
                throw new Error(data.error?.message)
            }
        })
        .catch(error => { throw new Error(error) })
    } */

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