import { getDecryptedManager } from "@/lib/auth/session"
import { getManagerFromDatabaseById } from "@/lib/database/functions/managers"
import { Manager } from "@/types"

export const getProfilePageData = async ({ id } : { id: string }) => {

    const decryptedManager = await getDecryptedManager()

    if (!decryptedManager) throw new Error('No manager session found.')

    const manager = await getManagerFromDatabaseById({ id, scope: 'detailed' })
    .then(data => data)
    .catch(error => { throw new Error(error as string) }) as unknown as Manager

    if (decryptedManager.id != manager.id) throw new Error('This is not your profile page.')

    return JSON.parse(JSON.stringify(manager))
}