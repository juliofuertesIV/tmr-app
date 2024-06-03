import { IOneOfCollectionNames, IOneOfCollectionsWithMediaNames } from "@/types"
import { getModelByCollectionName } from "../_utils"
import { Inscription, sequelize } from "@/database"
import { constructAPIResponse } from "../../_utils"
import { handleApiError, logError } from "../../_utils/errors"
import { ICreateInscriptionPayload } from "@/types/inscriptions"
import { CreateMedia } from "@/media/create"

export const createItem = async ({ collection, formData } : { collection: IOneOfCollectionNames, formData: FormData }) => {

    const { Model } = getModelByCollectionName(collection)

    const payload = Object.fromEntries(formData)
    const transaction = await sequelize.transaction()

    try {
        const data = await Model.create({ ...payload }, { transaction })
        await transaction.commit()
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
        await transaction.rollback();

        await logError({ 
            error, 
            collection,
            route: `/api/${ collection }`
        })

        return Response.json(
            constructAPIResponse({ 
                message: "Ha habido un problema creando el elemento.",
                success: false,
                error,
                data: null 
            })
        )
    }
}

export const createItemWithMedia = async ({ collection, formData } : { collection: IOneOfCollectionsWithMediaNames, formData: FormData }) => {
    
    const payload = Object.fromEntries(formData) as ICreateInscriptionPayload

    // TO DO: Media validation!!

    const { MediumId } = await CreateMedia({ formData, collection, domain: payload.domain }) as { MediumId: string }

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

        const route = '/api/' + collection

        await logError({ 
            error, 
            collection,
            route
        })

        return await handleApiError({
            collection: 'inscriptions',
            route,
            error,
            message: 'Fallo inscribiendo candidatura.' 
        })
    }
}