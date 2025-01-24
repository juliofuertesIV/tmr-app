import { createAndUploadMedia } from "@/app/api/media/_functions"
import { Media } from "@/database/models"
import { createMedia } from "@/lib/media/create"
import { ICollectionsWithMediaNames, ICollectionsWithMediumNames } from "@/types/media"
import { getModelByCollectionName } from "../../../_utils"
import { where } from "sequelize"

export const updateCollectionItemMedium = ({ 
    collection,
    collectionItemId,
    MediumId } : { 
    collection: ICollectionsWithMediumNames,
    collectionItemId: string | number,
    MediumId: string
    }) => {
    
}

export const deleteCollectionItemMedia = async ({ MediumId } : { MediumId: string }) => {

    return await Media.destroy({ where: { id: MediumId }})

}

export const addMediaToCollectionItem = async ({ formData, collection, id } : { formData: FormData, collection: ICollectionsWithMediumNames, id: string }) => {

    let createdMedia;

    try {
        createdMedia = await createAndUploadMedia({ formData })
    }
    catch (error) {
        throw new Error(error as string)
    }

    const { MediumId, transaction } = createdMedia

    const { Model } = getModelByCollectionName(collection)

    try {
        await Model.update({ MediumId }, { where: { id }, transaction })
    } catch (error) {
        throw new Error(error as string)
    }
    

}