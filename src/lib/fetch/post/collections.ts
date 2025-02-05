'use server'

import { ICollectionNames } from "@/types"
import { IAPIResponse } from "@/types/api"
import { IAssociationNames } from "@/types/associations"
import { revalidateTag } from "next/cache"

export const addCollectionItem = async (
    collection: ICollectionNames,
    prevState: any,
    formData: FormData
) : Promise<IAPIResponse<null>> => {

    const res = await fetch(`http://localhost:3000/api/protected/${ collection }`, {
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

    const res = await fetch(`http://localhost:3000/api/protected/${ collection }/${ collectionItemId }/${ association }`, {
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

export const addInscription = async (
    prevState: any,
    formData: FormData
) : Promise<IAPIResponse<null>> => {

    const res = await fetch(`http://localhost:3000/api/inscriptions`, {
        method: "POST",
        cache: 'no-cache',
        body: formData,
    })
    .then(data => data)
    .then(async data => await data.json())
    .catch(error => error)
    
    revalidateTag('inscriptions')
    revalidateTag('contests')
    return res

}
