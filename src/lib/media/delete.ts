import { constructAPIResponse } from "@/app/api/_utils"
import { handleApiError } from "@/lib/errors"
import { Media, sequelize } from "@/lib/database"
import { IMedia } from "@/types/media"
import { deleteFromCloudStorage } from "../storage/gcp_storage"

export const deleteMedia = async ({ mediaId } : { mediaId: string }) => {

    const media = await Media.findOne({ where: { id: mediaId }})
    .then(data => data as unknown as IMedia) 
    .catch(async (error) => {
        return await handleApiError({
            error,
            message: '',
            route: '/delete-media',
        })
    })
    
    const transaction = await sequelize.transaction()
    
    await deleteFromCloudStorage({ src: (media as IMedia).src }) 
    .catch(err => console.log(err)) // TO DO: NOT ROLLING BACK BECAUSE OF THIS

    try {
        await Media.destroy({ where: { id: mediaId }, transaction })
    }
    catch (error) {
        return await handleApiError({
            transaction,
            error,
            message: '',
            route: '/delete-media',
        })
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