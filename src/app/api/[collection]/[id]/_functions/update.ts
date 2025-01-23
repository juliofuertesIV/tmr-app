import { getModelByCollectionName } from "../../_utils"
import { Inscription, Media, sequelize } from '@/database/models'
import { constructAPIResponse } from "@/app/api/_utils"
import { handleApiError } from "@/lib/errors"
import { validateFileTypeAndSize } from "@/lib/media/validate/functions"
import { IMediaPayload } from "@/types/media"
import { createMedia, createMedium } from "@/lib/media/create"
import { ICollectionNames, IInscription } from "@/types"
import { deleteFromCloudStorage } from "@/lib/storage/gcp_storage"

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
            route: `/api/collections/${ collection }/${ id }`
        })
    }
}

export const updateInscriptionMedia = async ({ collection, formData, id } : Props) => {

    const payload = Object.fromEntries(formData) as IMediaPayload
    
    const { file, domain } = payload 

    try {
        validateFileTypeAndSize({ file, type: 'image' })
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

    const { MediumId: newMediumId } = await createMedia({ formData, collection: 'inscriptions' })
        .then(data => data)
        .catch(async (error) => {
            return await handleApiError({
                error, 
                collection,
                route: `/api/collections/${ collection }/${ id }`
            })
        }) as { MediumId: string } 


    const affectedRows = await Inscription.update({ MediumId: newMediumId }, { where: { id }, transaction })
        .then(data => data)
        .catch(async (error) => {
            return await handleApiError({
                message: 'Error updating incription media ID',
                error, 
                collection,
                route: `/api/collections/${ collection }/${ id }`
            })
        })

    try {
        deleteFromCloudStorage({ src: inscription.Medium.src })
    }
    catch (error) {
        return await handleApiError({
            error, 
            collection,
            route: `/api/collections/${ collection }/${ id }`
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

export const updateManagerMedia = async ({ collection, formData, id } : Props) => {

    const payload = Object.fromEntries(formData) as IMediaPayload
    
    const { file } = payload 

    try {
        validateFileTypeAndSize({ file, type: 'image' })
    }
    catch (error) {
        return await handleApiError({
            collection: 'managers',
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
                route: '/managers/id',
                collection: 'managers'
            })
        }) as unknown as IInscription

    const { MediumId: newMediumId } = await createMedium({ formData, collection: 'managers' })
        .then(data => data)
        .catch(async (error) => {
            return await handleApiError({
                error, 
                collection,
                route: `/api/collections/${ collection }/${ id }`
            })
        }) as { MediumId: string } 


    const affectedRows = await Inscription.update({ MediumId: newMediumId }, { where: { id }, transaction })
        .then(data => data)
        .catch(async (error) => {
            return await handleApiError({
                message: 'Error updating incription media ID',
                error, 
                collection,
                route: `/api/collections/${ collection }/${ id }`
            })
        })

    try {
        deleteFromCloudStorage({ src: inscription.Medium.src })
    }
    catch (error) {
        return await handleApiError({
            error, 
            collection,
            route: `/api/collections/${ collection }/${ id }`
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