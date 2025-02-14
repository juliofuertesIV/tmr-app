
import { getDecryptedManager } from "@/lib/auth/session";
import { CollectionNames, Manager as ManagerType } from "@/types";
import { getManagerFromDatabaseById } from "./managers";
import { getModelByCollectionName } from "../utils";

export const getCollectionFromDatabase = async ({ collectionName } : { collectionName: CollectionNames }) => {

    const decryptedManager = await getDecryptedManager()

    if (!decryptedManager) throw new Error('No manager session found.')

    const manager = await getManagerFromDatabaseById({ id: decryptedManager.id, scope: 'list' }).then(data => data) 

    if (!manager || manager.RoleId < 2) throw new Error(`No estás autorizado a manipular "${ collectionName }", consulta con tu admin.`) // TO DO: Extract this to general function.
    
    const { Model, options /*, scope instead of options */ } = getModelByCollectionName(collectionName)

    return await Model.findAll({ ...options }) 
    .then(data => data)
    .catch(error => { throw new Error(error as string) })
}


export const getCollectionItemFromDatabase = async ({ collectionName, id } : { collectionName: CollectionNames, id: string }) => {

    const decryptedManager = await getDecryptedManager()

    if (!decryptedManager) throw new Error('No manager session found.')

    const manager = await getManagerFromDatabaseById({ id: decryptedManager.id, scope: 'list' }).then(data => data) as unknown as ManagerType

    if (!manager || manager.RoleId < 2) throw new Error(`No estás autorizado a manipular "${ collectionName }", consulta con tu admin.`) // TO DO: Extract this to general function.
    
    const { Model, options /*, scope instead of options */ } = getModelByCollectionName(collectionName)

    return await Model.findOne({ where: { id }, ...options })
        .then(data => data)
        .catch(error => { throw new Error(error as string) })
}

