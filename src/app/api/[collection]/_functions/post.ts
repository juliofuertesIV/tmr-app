import { ICollectionNames } from "@/types"
import { getModelByCollectionName } from "../_utils"
import { Inscription } from '@/database/models'
import { constructAPIResponse } from "../../_utils"
import { handleApiError } from "@/lib/errors"
import { ICreateInscriptionPayload } from "@/types/inscriptions"
import { ICollectionsWithMediumNames } from "@/types/media"
import { createAndUploadMedia } from "../../media/_functions"

type ICollectionCreationPayload = {
    collection: ICollectionNames,
    formData: FormData
}

type ICollectionWithMediaCreationPayload = {
    collection: ICollectionsWithMediumNames,
    formData: FormData
}

export const addToCollection = async ({ collection, formData } : ICollectionCreationPayload) => {

    const { Model } = getModelByCollectionName(collection)

    const payload = Object.fromEntries(formData)

    try {
        const data = await Model.create({ ...payload })
        
        return Response.json(
            constructAPIResponse({ 
                message: "Elemento creado correctamente.",
                success: true,
                error: null,
                data 
            })
        )
    }
    catch (error) {

        return await handleApiError({
            error, 
            collection,
            route: `/api/${ collection }`
        })
        
    }
}

export const addInscription = async ({ collection, formData } : ICollectionWithMediaCreationPayload) => {
    
    const payload = Object.fromEntries(formData) as ICreateInscriptionPayload

    let createdMedium;

    try {
        createdMedium = await createAndUploadMedia({ formData })
    }
    catch (error) {
        return handleApiError({
            error,
            route: '/api/media'
        })
    }

    const { MediumId, transaction } = createdMedium

    try {
        const inscription = await Inscription.create({ MediumId, ...payload }, { transaction })

        return Response.json(
            constructAPIResponse({ 
                message: "Candidatura inscrita correctamente.",
                success: true,
                error: null,
                data: inscription 
            })
        )
    }
    catch (error) {
        return await handleApiError({
            collection,
            route: '/api/' + collection,
            error,
            transaction,
            message: 'Fallo inscribiendo candidatura.' 
        })
    }
}
