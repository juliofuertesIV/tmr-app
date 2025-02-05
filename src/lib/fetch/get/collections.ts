'use server'

import { IAllCollections, ICollectionNames } from "@/types"
import { IAPIResponse } from "@/types/api"
import { IAssociation, IAssociationNames, ICollectionsWithAssociations, IRelationship } from "@/types/associations"


export const getCollection = async (collection: ICollectionNames) : Promise<IAPIResponse<IAllCollections[]>> => {
    
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

export const getCollectionElementById = async (collection: ICollectionNames, id: string) : Promise<IAPIResponse<IAllCollections>> => {
    
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

/* 
export const getCollectionElementAndAssociationsById = async (collection: ICollectionNames, id: string, association: IAssociationNames) : Promise<IAPIResponse<{
    item: ICollectionsWithAssociations, 
    associationItems: IAssociation[] | IRelationship[],
    associationKey: IAssociationKeys,
    associationIdField: IAssociationIdFieldnames,
}>> => {

    const res = await fetch(`http://localhost:3000/api/protected/${ collection }/${ id }/${ association }`, {
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
 */