import { Inscription } from "@/database/models"
import { InscriptionScope } from "@/types/inscriptions"

export const getInscriptionFromDatabase = async ({ id, scope } : { id: string, scope: InscriptionScope }) => {

    const inscription = await Inscription.scope(scope).findOne({ where: { id }})
    .then(data => data)
    .catch(error => { throw new Error(error as string) }) 

    return inscription
}