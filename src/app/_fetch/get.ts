import { IOneOfCollectionNames } from "@/interfaces"
import { IAPIResponse } from "@/interfaces/forms"

type GetElementById = (collection: IOneOfCollectionNames, id: string) => Promise<IAPIResponse>

type GetContests = (collection: IOneOfCollectionNames) => Promise<IAPIResponse>

export const getCollectionElementById : GetElementById = async (collection: IOneOfCollectionNames, id: string) => {
    
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

export const getCollection : GetContests = async (collection: IOneOfCollectionNames) => {
    
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


