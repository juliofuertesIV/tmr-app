'use server'

import { ICollectionNames } from "@/types"
import { IAPIResponse } from "@/types/api"
import { IAssociationNames } from "@/types/associations"
import { revalidateTag } from "next/cache"

export const addCollectionElement = async (
    collection: ICollectionNames,
    prevState: any,
    formData: FormData
) : Promise<IAPIResponse<null>> => {

    //TO DO: Separate manager routes

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
