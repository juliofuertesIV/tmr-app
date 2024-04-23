'use server'
    
import { FormState } from "@/interfaces/forms"
import { revalidateTag } from "next/cache"

export const updateContest = async (prevState: any, formData: FormData, id?: string) : Promise<FormState> => {
    
    const payload = Object.fromEntries(formData)

    if (!id) throw new Error('Bad formed, missing ID')

    const res = await fetch(`http://localhost:3000/api/contests/${ id }`, {
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

