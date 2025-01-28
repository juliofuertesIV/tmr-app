'use server'
    
import { ICollectionNames } from "@/types"
import { IAPIResponse } from "@/types/api"
import { revalidateTag } from "next/cache"

export const updateInscription = async (
    id: string,
    prevState: any,
    formData: FormData
) : Promise<IAPIResponse<null>> => {

    const res = await fetch(`http://localhost:3000/api/inscriptions/${ id }`, {
        method: "PUT",
        cache: 'no-cache',
        body: formData
    })
    .then(async data => data.json())
    .catch(error => error)
    
    revalidateTag('inscriptions')

    return res
}
