import { getContestInscriptionsFromDatabase } from "@/lib/database/functions/inscriptions"
import { Inscription as InscriptionType } from "@/types/inscriptions"


export const getContestInscriptionsPageData = async ({ contestId } : { contestId: string }) : Promise<InscriptionType[]> => {
    
    const inscriptions = await getContestInscriptionsFromDatabase({ contestId, scope: 'list' })

    return JSON.parse(JSON.stringify(inscriptions))
}