'use server'

import { IDashboardData } from "@/types/admin"
import { IAPIResponse } from "@/types/api"

export const getDashboardData = async () : Promise<IAPIResponse<IDashboardData>> => {
    
    const res = await fetch(`http://localhost:3000/api/admin`, {
        method: "GET",
        cache: 'no-cache',
        headers: {
            "Content-Type": "application/json",
        },
        next: {
            tags: ['contests, brands, params, states']
        }
    })
    .then(async (data) => await data.json())
    .catch(error => error)

    return res
}
