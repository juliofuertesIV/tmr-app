'use server'

import { IAPIResponse } from "@/types/api"
import { IContest, IContestAssociationNames, IContestAssociations } from "@/types/contests"

export const getContestById = async ({ id }: { id: string }) : Promise<IAPIResponse<IContest>> => {

    const res = await fetch(`http://localhost:3000/api/protected/contests/${ id }`, {
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

export const getContests = async () : Promise<IAPIResponse<IContest[]>> => {

    const res = await fetch(`http://localhost:3000/api/protected/contests/`, {
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

export const getContestByDomain = async (domain: string) : Promise<IAPIResponse<IContest | null>> => {
    
    const res = await fetch(`http://localhost:3000/api/protected/contests/domain/${ domain }`, {
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

export const getContestAndAssociation = async ({ 
    id, 
    association 
} : { 
    id: string, 
    association: IContestAssociationNames 
}) : Promise<IAPIResponse<{ contest: IContest, associationItems: IContestAssociations[] } | null>> => {
    
    const res = await fetch(`http://localhost:3000/api/protected/contests/${ id }/${ association }`, {
        method: "GET",
        cache: 'no-cache',
        headers: {
            "Content-Type": "application/json",
        },
        next: {
            tags: ['contests', association]
        }
    })
    .then(async (data) => await data.json())
    .catch(error => error)
    
    return res
}

