import { getModelByCollectionName } from "../../_utils"
import { IInscription, ICollectionNames } from "@/types"
import { Inscription, Media, sequelize } from "@/database"
import { constructAPIResponse } from "@/app/api/_utils"
import { handleApiError } from "@/app/api/_utils/errors"
import { validateMedia } from "@/media/validation"
import { IMediaPayload, IMediaTypes } from "@/types/media"
import { CreateMedia } from "@/media/create"
import { deleteFromCloudStorage } from "@/lib/gcp_storage"

type Props = {
    formData: FormData,
    collection: ICollectionNames,
    id: string
}

export const updateCollectionItem = async ({ collection, formData, id } : Props) => {

    const { Model } = getModelByCollectionName(collection)

    const payload = Object.fromEntries(formData)

    const transaction = await sequelize.transaction()

    try {
        const affectedRows = await Model.update({ ...payload }, { where: { id }, transaction })
        await transaction.commit()

        return Response.json(
            constructAPIResponse({ 
                message: "Elemento editado correctamente.",
                success: true,
                error: null,
                data: affectedRows 
            })
        )
    }
    catch (error) {
        return await handleApiError({
            transaction,
            error, 
            collection,
            route: `/api/${ collection }/${ id }`
        })
    }
}

export const updateInscriptionMedia = async ({ collection, formData, id } : Props) => {

    const payload = Object.fromEntries(formData) as IMediaPayload
    
    const { file, type, domain } = payload 

    try {
        validateMedia({ file, type })
    }
    catch (error) {
        return await handleApiError({
            collection: 'inscriptions',
            route: '/api/' + collection,
            error,
            message: 'Fallo validando el archivo.' 
        })
    }
    
    const transaction = await sequelize.transaction()

    const inscription = await Inscription.findOne({ where: { id }, include: [ Media ]})
        .then(data => data)
        .catch(async (error) => {
            return await handleApiError({
                message: 'No se encontró la inscripción en la DB',
                error,
                route: '/inscriptions/id',
                collection: 'inscriptions'
            })
        }) as unknown as IInscription

    const { MediumId: newMediumId } = await CreateMedia({ formData, collection: 'inscriptions', domain })
        .then(data => data)
        .catch(async (error) => {
            return await handleApiError({
                error, 
                collection,
                route: `/api/${ collection }/${ id }`
            })
        }) as { MediumId: string } 


    const affectedRows = await Inscription.update({ MediumId: newMediumId }, { where: { id }, transaction })
        .then(data => data)
        .catch(async (error) => {
            return await handleApiError({
                message: 'Error updating incription media ID',
                error, 
                collection,
                route: `/api/${ collection }/${ id }`
            })
        })

    try {
        deleteFromCloudStorage({ src: inscription.Medium.src })
    }
    catch (error) {
        return await handleApiError({
            error, 
            collection,
            route: `/api/${ collection }/${ id }`
        })
    }

    return Response.json(
        constructAPIResponse({
            message: 'Actualizado correctamente',
            error: null,
            data: affectedRows,
            success: true
        })
    )


}