'use server'

import { CollectionNames } from "@/types"
import { IAPIResponse } from "@/types/api"
import { AssociationNames, CollectionsWithAssociationNames } from "@/types/associations"
import { revalidateTag } from "next/cache"

export const addCollectionItem = async (
    collection: CollectionNames,
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

export const associateToCollectionItem = async (
    collection: CollectionsWithAssociationNames,
    id: string,
    association: AssociationNames,
    prevState: any,
    formData: FormData
) : Promise<IAPIResponse<null>> => {

    const res = await fetch(`http://localhost:3000/api/protected/${ collection }/${ id }/${ association }`, {
        method: "POST",
        cache: 'no-cache',
        body: formData,
    })
    .then(async data => await data.json())
    .catch(error => error)
    
    revalidateTag(collection)
    revalidateTag(association)
    return res
}

