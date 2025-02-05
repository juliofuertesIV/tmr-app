'use server'
    
import { IAPIResponse } from "@/types/api"
import { revalidateTag } from "next/cache"

export const updateManagerProfile = async (
    id: string,
    prevState: any,
    formData: FormData
) : Promise<IAPIResponse<null>> => {

    const res = await fetch(`http://localhost:3000/api/protected/auth/managers/${ id }`, {
        method: "PUT",
        cache: 'no-cache',
        body: formData
    })
    .then(async data => data.json())
    .catch(error => error)
    
    revalidateTag('managers')

    return res
}