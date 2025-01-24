import { Media, sequelize } from '@/database/models'
import { deleteFromCloudStorage } from '@/lib/storage/gcp_storage'
import { IMedia } from "@/types/media"


export const deleteMediaInStorageAndDatabase = async ({ MediumId } : { MediumId: string }) => {

    const media = await Media.findOne({ where: { id: MediumId }})
    .then(data => data as unknown as IMedia) 
    .catch(async (error) => { throw new Error(error as string) })
    
    const transaction = await sequelize.transaction()
    
    try { 
        await Media.destroy({ where: { id: MediumId }, transaction }) 
    }
    catch (error) {  throw new Error(error as string) }

    try { 
        await deleteFromCloudStorage({ src: media.src }) 
    }
    catch (error) { 
        await transaction.rollback()
        throw new Error(error as string) 
    } 

    await transaction.commit()

}