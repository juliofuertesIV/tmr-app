'use server'

import { FormState, IFormAction } from "@/interfaces/forms"
import { revalidateTag } from "next/cache"

export const addContest = async (prevState: any, formData: FormData) : Promise<FormState> => {

    const res = await fetch(`http://localhost:3000/api/contests`, {
        method: "POST",
        cache: 'no-cache',
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(async data => data.json())
    .catch(error => error)
    
    revalidateTag('contests')
    return res

}
