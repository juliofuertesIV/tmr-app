'use server'

import { Contest } from "@/database/models"

export type ContestScope = 'basic' | 'admin' | 'public'

export const getAllContestsFromDatabase = async ({ scope } : { scope: ContestScope }) => {

    const contests = await Contest.scope(scope).findAll()
    .then(data => data)
    .catch(error => { throw new Error(error as string )})

    return contests
}

export const getContestFromDatabaseById = async ({ id, scope } : { id: string, scope: ContestScope }) => {
    const contest = await Contest.scope(scope).findOne({ where: { id }})
    .then(data => data)
    .catch(error => { throw new Error(error as string )})

    return contest
}
