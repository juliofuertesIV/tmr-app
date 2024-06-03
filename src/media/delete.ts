import { constructAPIResponse } from "@/app/api/_utils"
import { logError } from "@/app/api/_utils/errors"
import { Media, sequelize } from "@/database"
import { deleteFromCloudStorage } from "@/lib/gcp_storage"
import { IMedia } from "@/types/media"

export const deleteMedia = async ({ mediaId } : { mediaId: string }) => {

    const media = await Media.findOne({ where: { id: mediaId }})
    .then(data => data as unknown as IMedia) 
    .catch(err => {
        return Response.json(
            constructAPIResponse({ 
                message: 'Error recuperando la imagen de la base de datos.',
                success: false,
                error: err,
                data: null
            })
        )
    })

    const transaction = await sequelize.transaction()

    try { await Media.destroy({ where: { id: mediaId }, transaction }) } 
    catch (error) {
        // TO DO: Collection? Media?
        await logError({ 
            error, 
            collection: undefined,
            route: `/api/delete-media`
        })
        
        return Response.json(
            constructAPIResponse({
                message: 'Error eliminando la imagen de la base de datos.',
                success: false,
                error,
                data: null
            })
        )
    }

    try { await deleteFromCloudStorage({ src: (media as IMedia).src }) } 
    catch (error) {
        await transaction.rollback()

        // TO DO: Collection? Media?
        await logError({ 
            error, 
            collection: undefined,
            route: `/api/delete-media`
        })

        return Response.json(
            constructAPIResponse({
                message: 'Error eliminando la imagen de Cloud Storage',
                success: true,
                error,
                data: null
            })
        )
    }

    await transaction.commit()

    return Response.json(
        constructAPIResponse({
            message: 'OK',
            success: true,
            error: null,
            data: null
        })
    )
}