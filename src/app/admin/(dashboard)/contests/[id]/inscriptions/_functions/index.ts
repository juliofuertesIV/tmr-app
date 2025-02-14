import { Inscription } from "@/database/models"
import { InscriptionScope, Inscription as InscriptionType } from "@/types/inscriptions"

export const getContestInscriptionsFromDatabase = async ({ contestId, scope } : { contestId: string, scope: InscriptionScope }) : Promise<InscriptionType[]> => {
    return await Inscription.scope(scope).findAll({ where: { ContestId: contestId }})
    .then(data => data)
    .catch(error => { throw new Error(error as string) }) as unknown as InscriptionType[]
}

export const getContestInscriptionsPageData = async ({ contestId } : { contestId: string }) : Promise<InscriptionType[]> => {
    
    const inscriptions = await getContestInscriptionsFromDatabase({ contestId, scope: 'list' })

    return JSON.parse(JSON.stringify(inscriptions))
}