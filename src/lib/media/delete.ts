import { Media, sequelize } from '@/database/models'
import { IMedia } from "@/types/media"
import { deleteFromCloudStorage } from "../storage/gcp_storage"

export const deleteMedia = async ({ mediaId } : { mediaId: string }) => {

    const media = await Media.findOne({ where: { id: mediaId }})
    .then(data => data as unknown as IMedia) 
    .catch(async (error) => {
        return {
            error,
            message: '',
            route: '/delete-media',
        }
    })
    
    const transaction = await sequelize.transaction()
    
    await deleteFromCloudStorage({ src: (media as IMedia).src }) 
    .catch(err => console.log(err)) // TO DO: NOT ROLLING BACK BECAUSE OF THIS

    try {
        await Media.destroy({ where: { id: mediaId }, transaction })
    }
    catch (error) {
        return {
            transaction,
            error,
            message: '',
            route: '/delete-media',
        }
    }

    await transaction.commit()

    return {
        message: `Eliminado correctamente. Id: ${ mediaId }`,
        success: true,
        route: '/api/media',
        error: null,
        data: null
    }
}