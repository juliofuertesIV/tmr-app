import { Inscription } from "@/database/models"
import { Inscription as InscriptionType } from "@/types/inscriptions"

export const getInscriptionFromDatabase = async ({ id } : { id: string }) : Promise<InscriptionType | null> => {

    const inscription = await Inscription.scope('detailed').findOne({ where: { id }})
    .then(data => data)
    .catch(error => { throw new Error(error as string) }) as unknown as InscriptionType | null

    return JSON.parse(JSON.stringify(inscription))
}