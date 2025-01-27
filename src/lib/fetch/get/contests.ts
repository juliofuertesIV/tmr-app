'use server'

import { IContest } from "@/types"
import { IAPIResponse } from "@/types/api"

export const getContestByDomain = async (domain: string) : Promise<IAPIResponse<IContest | null>> => {
    
    const res = await fetch(`http://localhost:3000/api/contests/domain/${ domain }`, {
        method: "GET",
        cache: 'no-cache',
        headers: {
            "Content-Type": "application/json",
        },
        next: {
            tags: ['contests']
        }
    })
    .then(async (data) => await data.json())
    .catch(error => error)
    
    return res
}

