import { Inscription } from "@/database/models"
import { InscriptionScope } from "@/types/inscriptions"

export const getContestInscriptionsFromDatabase = async ({ contestId, scope } : { contestId: string, scope: InscriptionScope }) => {
    return await Inscription.scope(scope).findAll({ where: { ContestId: contestId }})
    .then(data => data)
    .catch(error => { throw new Error(error as string) })
}
