import { createAndUploadMedia } from "@/app/api/media/_functions"
import { ICollectionsWithMediumNames } from "@/types/media"
import { getModelByCollectionName } from "../../../_utils"
import { ICollectionsWithMedium } from "@/types"

export const getCollectionItemMediumById = async (collection: ICollectionsWithMediumNames, id: string) => {
    
    const { Model } = getModelByCollectionName(collection);

    const collectionItem = await Model.findOne({ where: { id } })
    .then(data => data)
    .catch(error => {
        throw new Error(error as string);
    }) as unknown as ICollectionsWithMedium;

    return collectionItem.Medium;
}


export const updateCollectionItemMedium = ({ 
    collection,
    collectionItemId,
    MediumId } : { 
    collection: ICollectionsWithMediumNames,
    collectionItemId: string | number,
    MediumId: string
    }) => {
    
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