import { createAndUploadMedia } from "@/app/api/media/_functions"
import { ICollectionsWithMediumNames } from "@/types/media"
import { ICollectionsWithMedium } from "@/types"
import { getAssociationModelByName, getModelByCollectionName } from "../../_utils";
import { deleteMediaInStorageAndDatabase } from "@/lib/media/delete";
import { handleApiError } from "@/lib/errors";

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

    await transaction.commit()
}

export const createAndAssociateMedia = async ({ formData, collectionItemId } : { formData: FormData, collectionItemId: string }) => {
    let createdMedia;

    try {
        createdMedia = await createAndUploadMedia({ formData })
    } catch (error) {
        throw new Error(error as string)
    }

    const { MediumId, transaction } = createdMedia

    const { 
        AssociationTable,
        collectionItemIdField,
    } = getAssociationModelByName('media')

    const creationPayload = { [collectionItemIdField]: collectionItemId, MediumId } // i. e. ContestId, MediumId

    try {
        AssociationTable.create({ ...creationPayload })
    } catch (error) {
        await transaction.rollback()
        throw new Error(error as string)
    }

    await transaction.commit()
}

export const deleteMedia = async ({ formData } : { formData: FormData }) => {

    const mediaId = formData.get('currentMediumId') as string

    if (!mediaId) throw new Error('No media id found.')

    try {
        await deleteMediaInStorageAndDatabase({ MediumId: mediaId }) // TO DO: ON DELETE CASCADE
    } catch (error) {

        return await handleApiError({
            error,
            route: 'media/functions/delete'
        })
    }

}

