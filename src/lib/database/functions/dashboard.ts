'use server'

import { Manager } from "@/database/models"
import { ManagerScope } from "./managers"
import { getAllContestsFromDatabase } from "./contests"
import { DecryptedJWTManager, Manager as ManagerType } from "@/types"


const getAdminContests = async () => {
    return await getAllContestsFromDatabase({ scope: 'basic' })
}

export const getDashboardData = async ({ decryptedManager, scope } : { decryptedManager: DecryptedJWTManager | null, scope: ManagerScope }) => {

    if (!decryptedManager) throw new Error('No session found.')

    const manager = await Manager.scope(scope).findOne({ where: { id: decryptedManager.id }})
    .then(data => data)
    .catch(error => { throw new Error(error as string) }) as unknown as ManagerType

    if (!manager) throw new Error('No manager found with this id.')
    
    const contests = manager.RoleId > 2 ? await getAdminContests() : manager.Contests

    return contests
}
