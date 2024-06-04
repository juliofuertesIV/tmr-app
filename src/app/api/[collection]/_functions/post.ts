import { ICollectionNames, ICollectionsWithMediaNames } from "@/types"
import { getModelByCollectionName } from "../_utils"
import { Inscription } from "@/database"
import { constructAPIResponse } from "../../_utils"
import { handleApiError } from "@/errors"
import { ICreateInscriptionPayload } from "@/types/inscriptions"
import { createMedia } from "@/media/create"
import { validateMedia } from "@/media/validation"

export const addToCollection = async ({ collection, formData } : { collection: ICollectionNames, formData: FormData }) => {

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

export const addToCollectionWithMedia = async ({ collection, formData } : { collection: ICollectionsWithMediaNames, formData: FormData }) => {
    
    const payload = Object.fromEntries(formData) as ICreateInscriptionPayload

    try {
        validateMedia({ file: payload.file, type: 'image' })
    }
    catch (error) {
        return await handleApiError({
            collection: 'inscriptions',
            route: '/api/' + collection,
            error,
            message: 'Fallo validando el archivo.' 
        })
    }

    const { MediumId } = await createMedia({ formData, collection }) as { MediumId: string }

    try {
        const inscription = await Inscription.create({ MediumId, ...payload })

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
            collection: 'inscriptions',
            route: '/api/' + collection,
            error,
            message: 'Fallo inscribiendo candidatura.' 
        })
    }
}