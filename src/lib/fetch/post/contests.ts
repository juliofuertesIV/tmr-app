'use server'

import { IAPIResponse } from "@/types/api"
import { ContestAssociationNames } from "@/types/contests"
import { revalidateTag } from "next/cache"

export const addContest = async (
    prevState: any,
    formData: FormData
) : Promise<IAPIResponse<null>> => {

    const res = await fetch(`http://localhost:3000/api/protected/contests`, {
        method: "POST",
        cache: 'no-cache',
        credentials: 'include',
        body: formData
    })
    .then(async data => await data.json())
    .catch(error => error)
    
    revalidateTag('contests')
    return res
}


export const associateItemToContest = async (
    contestId: string,
    association: ContestAssociationNames,
    prevState: any,
    formData: FormData
) : Promise<IAPIResponse<null>> => {

    const res = await fetch(`http://localhost:3000/api/protected/contests/${contestId}/${ association }`, {
        method: "POST",
        cache: 'no-cache',
        body: formData,
    })
    .then(async data => await data.json())
    .catch(error => error)
    
    revalidateTag('contests')
    revalidateTag(association)
    return res
}
