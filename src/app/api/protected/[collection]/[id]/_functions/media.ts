import { createAndUploadMedia } from "@/app/api/protected/media/_functions"
import { ICollectionsWithMediumNames } from "@/types/media"
import { getModelByCollectionName } from "../../../contests/[id]/[association]/_utils";
import { deleteMediaInStorageAndDatabase } from "@/lib/media/delete";
import { CollectionNames } from "@/types";

export const addMediaToCollectionItem = async ({ formData, collection, id } : { formData: FormData, collection: ICollectionsWithMediumNames, id: string }) => {

    let createdMedia;

    try {
        createdMedia = await createAndUploadMedia({ formData })
    }
    catch (error) {
        throw new Error(error as string)
    }

    const { MediumId, transaction } = createdMedia

    const { Model } = getModelByCollectionName(collection as CollectionNames)

    try {
        await Model.update({ MediumId }, { where: { id }, transaction })
    } catch (error) {
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

