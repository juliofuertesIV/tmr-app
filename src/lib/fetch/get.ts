'use server'

import { IContest, IInscription, ICollectionNames, IAllCollections } from "@/types"
import { IAdminData } from "@/types/admin"
import { IAPIResponse } from "@/types/api"
import { IAssociationIdFieldnames, IAssociationKeys, IAssociationNames, IAssociation, ICollectionsWithAssociations, IRelationship } from "@/types/associations"

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


export const getCollectionElementAndAssociationsById = async (collection: ICollectionNames, id: string, association: IAssociationNames) : Promise<IAPIResponse<{
    item: ICollectionsWithAssociations, 
    associationItems: IAssociation[] | IRelationship[],
    associationKey: IAssociationKeys,
    associationIdField: IAssociationIdFieldnames,
}>> => {

    const res = await fetch(`http://localhost:3000/api/${ collection }/${ id }/${ association }`, {
        method: "GET",
        cache: 'no-cache',
        headers: {
            "Content-Type": "application/json",
        },
        next: {
            tags: [collection, association]
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