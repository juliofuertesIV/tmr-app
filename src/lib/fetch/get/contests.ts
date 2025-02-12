'use server'

import { IAPIResponse } from "@/types/api"
import { Contest, ContestAssociationNames, ContestAssociations } from "@/types/contests"

export const getContestById = async ({ id }: { id: string }) : Promise<IAPIResponse<Contest>> => {

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

export const getContests = async () : Promise<IAPIResponse<Contest[]>> => {

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

export const getContestByDomain = async (domain: string) : Promise<IAPIResponse<Contest | null>> => {
    
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
    association: ContestAssociationNames 
}) : Promise<IAPIResponse<{ contest: Contest, associationItems: ContestAssociations[] } | null>> => {
    
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

