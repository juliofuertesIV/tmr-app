import { Media, sequelize } from '@/database/models'
import { deleteFromCloudStorage } from '@/lib/storage/gcp_storage'
import { IMedia } from "@/types/media"

export const deleteMediaInStorageAndDatabase = async ({ MediumId } : { MediumId: string }) => {

    let media;
    
    try {
        media = await Media.findOne({ where: { id: MediumId }})
        .then(data => data as unknown as IMedia) 
    }
    catch(error) { 
        throw new Error(error as string) 
    }

    try {
        await sequelize.transaction(async (t) => {

            await Media.destroy({ where: { id: MediumId }, transaction: t })
            .catch(err => {
                throw new Error(err as string)
            })
            await deleteFromCloudStorage({ filename: media.filename, folder: media.folder })  
        })
    } catch (error) {
        throw new Error(error as string)
    }
}
 