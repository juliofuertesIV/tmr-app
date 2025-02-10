'use server'

import { IAPIResponse } from "@/types/api"
import { cookies } from "next/headers"

export const login = async (
    prevState: any,
    formData: FormData
) : Promise<IAPIResponse<null>> => {


    const res = await fetch(`http://localhost:3000/api/login`, {
        method: "POST",
        cache: 'no-cache',
        body: formData
    })
    .then(async (data) => {

        const response = await data.json()

        if (response.success) {
            
            const { session } = response.data
            
            cookies().set(
                'session',
                session,
                { 
                    secure: true,
                    maxAge: 1000 * 60 * 60 * 72,
                    domain: 'localhost',
                    httpOnly: true 
                }
            )
        }

        return response
    })
    .catch(error => error)
    
    return res

} 