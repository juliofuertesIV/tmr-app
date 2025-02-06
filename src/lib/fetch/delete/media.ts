'use server'

import { IAPIResponse } from "@/types/api"
import { revalidateTag } from "next/cache"

export const deleteMediaItem = async (
    collection: 'contests' | 'managers' | 'sponsors' | 'inscriptions',
    mediumId: string | number,
    prevState: any,
) : Promise<IAPIResponse<null>> => {

    const res = await fetch(`http://localhost:3000/api/protected/media/${ mediumId }`, {
        method: "DELETE",
        cache: 'no-cache'
    })
    .then(async data => await data.json())
    .catch(error => error)
    
    revalidateTag(collection)
    return res    
}
