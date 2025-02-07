'use server'

import { IInscription } from "@/types"
import { IAPIResponse } from "@/types/api"
import { IContest } from "@/types/contests"

export const getContestInscriptions = async (contestId: string) : Promise<IAPIResponse<IInscription[] | null>> => {
    
    const res = await fetch(`http://localhost:3000/api/protected/contests/${ contestId }/inscriptions`, {
        method: "GET",
        cache: 'no-cache',
        headers: {
            "Content-Type": "application/json",
        },
        next: {
            tags: ['inscriptions']
        }
    })
    .then(async (data) => await data.json())
    .catch(error => error)

    return res
}

export const getInscriptionByIdAndContestId = async (contestId: string, id: string) : Promise<IAPIResponse<IInscription>> => {
   
    const res = await fetch(`http://localhost:3000/api/protected/contests/${ contestId }/inscriptions/${ id }`, {
        method: "GET",
        cache: 'no-cache',
        headers: {
            "Content-Type": "application/json",
        },
        next: {
            tags: ['inscriptions']
        }
    })
    .then(async (data) => await data.json())
    .catch(error => error)

    return res
}