import { createAndUploadMedia } from "@/app/api/protected/media/_functions";
import { Inscription } from "@/database/models";
import { deleteMediaInStorageAndDatabase } from "@/lib/media/delete";
import { Inscription as InscriptionType } from "@/types/inscriptions";

export const addInscriptionToContest = async ({ formData, ContestId } : { formData: FormData, ContestId: string }) => {
    
    let createdMedium;

    try {
        createdMedium = await createAndUploadMedia({ formData })
    }
    catch (error) {
        throw new Error(error as string)
    }

    const { MediumId, transaction } = createdMedium

    formData.delete('file')

    const creationPayload = { ...Object.fromEntries(formData), ContestId, MediumId }

    let inscription;

    try {
        inscription = await Inscription.create({ ...creationPayload }, { transaction }) 
    }
    catch (error) {
        await transaction.rollback()
        throw new Error()
    }

    await transaction.commit()

    return inscription
}


export const updateInscription = async ({ formData, id } : { formData: FormData, id: string }) => {
    
    if (formData.get('file'))
        return updateInscriptionMedia({ formData, id })
    
    const payload = Object.fromEntries(formData)
    
    try {
        await Inscription.update({ ...payload }, { where: { id }})
    }
    catch (error) {
        throw new Error(error as string)
    }

}

export const updateInscriptionMedia = async ({ formData, id } : { formData: FormData, id: string }) => {

    const inscription = await Inscription.findOne({ where: { id }})
    .then(data => data)
    .catch(error => { throw new Error(error as string) }) as unknown as InscriptionType

    if (!inscription) throw new Error('No inscription found with this id.')

    try {
        await deleteCurrentInscriptionMedia({ MediumId: inscription.MediumId })
    }
    catch (error) {
        throw new Error(error as string)
    }

    try {
        const { MediumId, transaction } = await createAndUploadMedia({ formData })
        await Inscription.update({ MediumId }, { where: { id }})
        await transaction.commit()
    }
    catch (error) {
        throw new Error(error as string)
    }

}

const deleteCurrentInscriptionMedia = async ({ MediumId } : { MediumId: string | null }) => {
 
    if (!MediumId) return
    return await deleteMediaInStorageAndDatabase({ MediumId })

}