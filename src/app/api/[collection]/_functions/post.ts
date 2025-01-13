import { ICollectionNames } from "@/types"
import { getModelByCollectionName } from "../_utils"
import { Inscription } from "@/lib/database"
import { constructAPIResponse } from "../../_utils"
import { handleApiError } from "@/lib/errors"
import { ICreateInscriptionPayload } from "@/types/inscriptions"
import { createMedia } from "@/lib/media/create"
import { validateMedia } from "@/lib/media/validation"
import { ICollectionsWithMediaNames } from "@/types/media"
import { Transaction } from "sequelize"

type ICollectionCreationPayload = {
    collection: ICollectionNames,
    formData: FormData
}

type ICollectionWithMediaCreationPayload = {
    collection: ICollectionsWithMediaNames,
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

export const addToCollectionWithMedia = async ({ collection, formData } : ICollectionWithMediaCreationPayload) => {
    
    const payload = Object.fromEntries(formData) as ICreateInscriptionPayload

    try {
        validateMedia({ file: payload.file, type: 'image' })
    }
    catch (error) {
        return await handleApiError({
            collection,
            route: '/api/' + collection,
            error,
            message: 'Fallo validando el archivo.' 
        })
    }

    const { MediumId, transaction } = await createMedia({ formData, collection }) as { MediumId: string, transaction: Transaction }

    try {
        const inscription = await Inscription.create({ MediumId, ...payload }, { transaction })

        return Response.json(
            constructAPIResponse({ 
                message: "Candidatura inscrita correctamente.",
                success: true,
                error: null,
                data: { inscription } 
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
