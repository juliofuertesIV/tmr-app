'use server'

import { IContest, IInscription, ICollectionNames, IAllCollections } from "@/lib/types"
import { IAdminData } from "@/lib/types/admin"
import { IAPIResponse } from "@/lib/types/api"

export const getCollectionElementById = async (collection: ICollectionNames, id: string) : Promise<IAPIResponse<IAllCollections>> => {
    
    const res = await fetch(`http://localhost:3000/api/${ collection }/${ id }`, {
        method: "GET",
        cache: 'no-cache',
        headers: {
            "Content-Type": "application/json",
        },
        next: {
            tags: [collection]
        }
    })
    .then(async (data) => await data.json())
    .catch(error => error)

    return res
}

export const getInscriptionsFromContestId = async (contestId: string) : Promise<IAPIResponse<{ contest: IContest, inscriptions: IInscription[] }>> => {
    
    const res = await fetch(`http://localhost:3000/api/apply/${ contestId }`, {
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


export const getCollection = async (collection: ICollectionNames) : Promise<IAPIResponse<IAllCollections[]>> => {
    
    const res = await fetch(`http://localhost:3000/api/${ collection }`, {
        method: "GET",
        cache: 'no-cache',
        headers: {
            "Content-Type": "application/json",
        },
        next: {
            tags: [collection]
        }
    })
    .then(async (data) => await data.json())
    .catch(error => error)

    return res
}

export const getDashboardData = async () : Promise<IAPIResponse<IAdminData>> => {
    
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

export const logoutManager = async () : Promise<IAPIResponse<any>> => {

    const res = await fetch(`http://localhost:3000/api/auth/logout`, {
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