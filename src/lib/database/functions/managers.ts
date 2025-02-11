'use server'

import { Manager } from "@/database/models"

export type ManagerScope = 'list' | 'detailed'

export const getAllManagersFromDatabase = async ({ scope } : { scope: ManagerScope }) => {

    const contests = await Manager.scope(scope).findAll()
    .then(data => data)
    .catch(error => { throw new Error(error as string )})

    return contests
}

export const getManagerFromDatabaseById = async ({ id, scope } : { id: string, scope: ManagerScope }) => {
    const contest = await Manager.scope(scope).findOne({ where: { id }})
    .then(data => data)
    .catch(error => { throw new Error(error as string )})

    return contest
}
