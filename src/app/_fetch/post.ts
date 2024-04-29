'use server'

import { IOneOfCollectionNames } from "@/interfaces"
import { IAPIResponse } from "@/interfaces/forms"
import { revalidateTag } from "next/cache"

export const addCollectionElement = async (collection: IOneOfCollectionNames, prevState: any, formData: FormData) : Promise<IAPIResponse> => {

    const payload = Object.fromEntries(formData)

    const res = await fetch(`http://localhost:3000/api/${ collection }`, {
        method: "POST",
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

export const manageContestParams = async ({ 
    ContestId,
    ParamId,
    method 
} : { 
    ContestId: string | number,
    ParamId: string,
    method: 'POST' | 'DELETE'
}) : Promise<IAPIResponse> => {

    const res = await fetch(`http://localhost:3000/api/contestsparams`, {
        method,
        cache: 'no-cache',
        body: JSON.stringify({ ContestId, ParamId }),
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(async data => data.json())
    .catch(error => error)

    revalidateTag('contests')
    return res
}