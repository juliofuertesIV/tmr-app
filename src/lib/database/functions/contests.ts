'use server'

import { Contest } from "@/database/models"
import { IContest } from "@/types/contests"

export type ContestScope = 'basic' | 'admin' | 'public'

export const getAllContestsFromDatabase = async ({ scope } : { scope: ContestScope }) => {

    const contests = await Contest.scope(scope).findAll()
    .then(data => data)
    .catch(error => { throw new Error(error as string )})

    return contests as unknown as IContest[]
}

export const getContestFromDatabaseById = async ({ id, scope } : { id: string, scope: ContestScope }) => {
    const contest = await Contest.scope(scope).findOne({ where: { id }})
    .then(data => data)
    .catch(error => { throw new Error(error as string )})

    return contest as unknown as IContest
}
