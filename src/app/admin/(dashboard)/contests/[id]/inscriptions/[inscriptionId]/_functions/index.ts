import { Inscription } from "@/database/models"
import { InscriptionScope, Inscription as InscriptionType } from "@/types/inscriptions"

export const getInscriptionFromDatabase = async ({ id, scope } : { id: string, scope: InscriptionScope }) : Promise<InscriptionType | null> => {

    const inscription = await Inscription.scope('detailed').findOne({ where: { id }})
    .then(data => data)
    .catch(error => { throw new Error(error as string) }) as unknown as InscriptionType | null

    return JSON.parse(JSON.stringify(inscription))
}