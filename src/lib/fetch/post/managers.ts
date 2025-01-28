'use server'

import { IAPIResponse } from "@/types/api"
import { revalidateTag } from "next/cache"

export const addManager = async (
    prevState: any,
    formData: FormData
) : Promise<IAPIResponse<null>> => {

    const res = await fetch('http://localhost:3000/api/auth/managers', {
        method: "POST",
        cache: 'no-cache',
        body: formData
    })
    .then(async data => await data.json())
    .catch(error => error)
    
    revalidateTag('managers')
    return res
}
