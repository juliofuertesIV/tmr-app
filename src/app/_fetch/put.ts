'use server'
    
import { IOneOfCollectionNames } from "@/interfaces"
import { IAPIResponse } from "@/interfaces/forms"
import { revalidateTag } from "next/cache"

export const updateContest = async (collection: IOneOfCollectionNames, id: string, prevState: any, formData: FormData) : Promise<IAPIResponse> => {
    
    const payload = Object.fromEntries(formData)

    const res = await fetch(`http://localhost:3000/api/${ collection }/${ id }`, {
        method: "PUT",
        cache: 'no-cache',
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(async data => data.json())
    .catch(error => error)
    
    revalidateTag('contests')

    return res
}

