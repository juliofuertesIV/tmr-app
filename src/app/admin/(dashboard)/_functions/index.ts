import { getDecryptedManager } from "@/lib/auth/session"
import { getDashboardData } from "@/lib/database/functions/dashboard"
import { getManagerFromDatabaseById } from "@/lib/database/functions/managers"

export const getLayoutData = async () => {

    const decryptedManager = await getDecryptedManager()

    if (!decryptedManager) throw new Error('No manager session found')

    const manager = await getManagerFromDatabaseById({ id: decryptedManager.id, scope: 'detailed' })

    return JSON.parse(JSON.stringify(manager))

}

export const getDashboardPageData = async () => {

    const decryptedManager = await getDecryptedManager()

    if (!decryptedManager) throw new Error('No manager session found')

    const contests = await getDashboardData({ decryptedManager, scope: 'detailed' })

    return JSON.parse(JSON.stringify(contests))
}
