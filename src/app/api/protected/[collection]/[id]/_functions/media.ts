import { createAndUploadMedia } from "@/app/api/protected/media/_functions"
import { ICollectionsWithMediumNames } from "@/types/media"
import { ICollectionsWithMedium } from "@/types"
import { getAssociationModelByName, getModelByCollectionName } from "../../_utils";
import { deleteMediaInStorageAndDatabase } from "@/lib/media/delete";

export const getCollectionItemMediumById = async (collection: ICollectionsWithMediumNames, id: string) => {
    
    const { Model } = getModelByCollectionName(collection);

    const collectionItem = await Model.findOne({ where: { id } })
    .then(data => data)
    .catch(error => {
        throw new Error(error as string);
    }) as unknown as ICollectionsWithMedium;

    return collectionItem.Medium;
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

export const associateMediaToCollectionItem = async ({ formData, collectionItemId } : { formData: FormData, collectionItemId: string }) => {
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
        await deleteMediaInStorageAndDatabase({ MediumId })
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
        throw new Error('Error elimnando archivo multimedia.')
    }
}

