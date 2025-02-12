'use server'

import { Manager } from "@/database/models"
import { Manager as ManagerType } from "@/types"

export type ManagerScope = 'list' | 'detailed' 

export const getAllManagersFromDatabase = async ({ scope } : { scope: ManagerScope }) => {

    const managers = await Manager.scope(scope).findAll()
    .then(data => data)
    .catch(error => { throw new Error(error as string )}) as unknown as ManagerType[] | null

    return managers
}

export const getManagerFromDatabaseById = async ({ id, scope } : { id: string, scope: ManagerScope }) => {
    const manager = await Manager.scope(scope).findOne({ where: { id }})
    .then(data => data)
    .catch(error => { throw new Error(error as string )}) as unknown as ManagerType | null

    return manager
}
