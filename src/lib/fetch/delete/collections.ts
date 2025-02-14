'use server'
    
import { CollectionNames } from "@/types"
import { IAPIResponse } from "@/types/api"
import { AssociationNames, CollectionsWithAssociationNames } from "@/types/associations"
import { revalidateTag } from "next/cache"

export const deleteCollectionItem = async (collection: CollectionNames | 'contests' | 'inscriptions', itemId: string, prevState: any, formData: FormData) : Promise<IAPIResponse<null>> => {
    
    const payload = Object.fromEntries(formData)

    const res = await fetch(`http://localhost:3000/api/protected/${ collection }/${ itemId }`, {
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

export const dissociateFromCollectionItem = async (
    collection: CollectionsWithAssociationNames,
    id: string,
    association: AssociationNames,
    associationId: string,
    prevState: any,
    formData: FormData
) : Promise<IAPIResponse<null>> => {

    const res = await fetch(`http://localhost:3000/api/protected/${ collection }/${ id }/${ association }/${ associationId }`, {
        method: "DELETE",
        cache: 'no-cache',
        body: formData,
    })
    .then(async data => await data.json())
    .catch(error => error)
    
    revalidateTag(collection)
    revalidateTag(association)
    return res
}
