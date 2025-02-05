'use server'

import { ICollectionNames } from "@/types"
import { IAPIResponse } from "@/types/api"
import { IAssociationNames } from "@/types/associations"
import { ICollectionsWithMediaNames, ICollectionsWithMediumNames } from "@/types/media"
import { revalidateTag } from "next/cache"

export const deleteMediaItem = async (
    collection: ICollectionsWithMediaNames | ICollectionsWithMediumNames,
    mediaId: string | number,
    prevState: any,
) : Promise<IAPIResponse<null>> => {

    const res = await fetch(`http://localhost:3000/api/media/${ mediaId }`, {
        method: "DELETE",
        cache: 'no-cache'
    })
    .then(async data => await data.json())
    .catch(error => error)
    
    revalidateTag(collection)
    return res    
}

export const disassociateItems = async (
    collection: ICollectionNames,
    collectionItemId: string | number,
    association: IAssociationNames,
    associationItemId: string | number,
    prevState: any,
    formData: FormData
) : Promise<IAPIResponse<null>> => {

    const res = await fetch(`http://localhost:3000/api/protected/${ collection }/${ collectionItemId }/${ association }/${ associationItemId }`, {
        method: "DELETE",
        cache: 'no-cache'
    })
    .then(async data => await data.json())
    .catch(error => error)
    
    revalidateTag(collection)
    return res
}