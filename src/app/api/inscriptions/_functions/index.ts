import { createAndUploadMedia } from "../../media/_functions";
import { Inscription } from "@/database/models";
import { IInscription } from "@/types";

export const addInscription = async ({ formData } : { formData: FormData}) => {
    
    let createdMedium;

    try {
        createdMedium = await createAndUploadMedia({ formData })
    }
    catch (error) {
        throw new Error(error as string)
    }

    const { MediumId, transaction } = createdMedium

    formData.delete('file')

    const creationPayload = Object.fromEntries(formData)

    let inscription;

    try {
        inscription = await Inscription.create({ MediumId, ...creationPayload }, { transaction }) as unknown as IInscription
    }
    catch (error) {
        await transaction.rollback()
        throw new Error()
    }

    await transaction.commit()

    return inscription
}
