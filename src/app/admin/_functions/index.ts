import { getDecryptedManager } from "@/lib/auth/session"
import { getDashboardData } from "@/lib/database/functions/dashboard"

export const getDashboardPageData = async () => {

    const decryptedManager = await getDecryptedManager()

    if (!decryptedManager) throw new Error('No manager session found')

    const contests = await getDashboardData({ decryptedManager, scope: 'detailed' })

    return JSON.parse(JSON.stringify(contests))
}
