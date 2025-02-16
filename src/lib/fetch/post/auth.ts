'use server'

import { IAPIResponse } from "@/types/api"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export const login = async (
    prevState: any,
    formData: FormData
) : Promise<IAPIResponse<IAPIResponse<{ data: string }>>> => {

    const res = await fetch(`http://localhost:3000/api/login`, {
        method: "POST",
        cache: 'no-cache',
        body: formData
    })
    .then(async (data) => {

        const response = await data.json()

        if (response.success) {
            
            const { data: session } = response
            
            cookies().set(
                'session',
                session,
                { 
                    secure: process.env.NODE_ENV === "production",
                    maxAge: 1000 * 60 * 60 * 72,
                    domain: 'localhost',
                    sameSite: 'strict',
                    httpOnly: true 
                }
            )
        }

        return response
    })
    .catch(error => error)
    
    return res

} 

export const logoutManager = async () : Promise<NextResponse> => {

    const res = await fetch(`http://localhost:3000/api/protected/auth/logout`, {
        method: "POST",
        cache: 'no-cache'
    })
    .then(data => data)
    .catch(error => error)

    return res
}