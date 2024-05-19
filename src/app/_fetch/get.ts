import { IContest, IOneOfCollectionNames, IOneOfCollections } from "@/types"
import { IAdminData } from "@/types/admin"
import { IAPIResponse } from "@/types/api"

export const getCollectionElementById = async (collection: IOneOfCollectionNames, id: string) : Promise<IAPIResponse<IOneOfCollections>> => {
    
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

export const getCollection = async (collection: IOneOfCollectionNames) : Promise<IAPIResponse<IOneOfCollections[]>> => {
    
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

export const getAdminData = async () : Promise<IAPIResponse<IAdminData>> => {
    
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
