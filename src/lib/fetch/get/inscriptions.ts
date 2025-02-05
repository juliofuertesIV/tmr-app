'use server'

import { IContest, IInscription } from "@/types"
import { IAPIResponse } from "@/types/api"

export const getContestInscriptions = async (contestId: string) : Promise<IAPIResponse<{ contest: IContest, inscriptions: IInscription[] }>> => {
    
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

export const getInscriptionById = async (id: string) : Promise<IAPIResponse<IInscription>> => {
   
    const res = await fetch(`http://localhost:3000/api/inscriptions/${ id }`, {
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