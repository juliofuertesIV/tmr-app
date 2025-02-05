'use server'

import { IAPIResponse } from "@/types/api"

export const logoutManager = async () : Promise<IAPIResponse<any>> => {

    const res = await fetch(`http://localhost:3000/api/protected/auth/logout`, {
        method: "GET",
        cache: 'no-cache'
    })
    .then(async (data) => {
        const res = await data.json()
        return res
    })
    .catch(error => error)

    return res
}