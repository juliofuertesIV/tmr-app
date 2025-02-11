'use server'

import { AllCollections, CollectionNames } from "@/types"
import { IAPIResponse } from "@/types/api"


export const getCollection = async (collection: CollectionNames) : Promise<IAPIResponse<AllCollections[]>> => {
    
    const res = await fetch(`http://localhost:3000/api/protected/${ collection }`, {
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

export const getCollectionItemById = async (collection: CollectionNames, id: string) : Promise<IAPIResponse<AllCollections>> => {
    
    const res = await fetch(`http://localhost:3000/api/protected/${ collection }/${ id }`, {
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
