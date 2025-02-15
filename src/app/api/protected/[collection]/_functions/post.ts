import { CollectionNames } from "@/types"
import { getModelByCollectionName } from "../../contests/[id]/[association]/_utils"
import { createAndUploadMedia } from "../../media/_functions"

type ICollectionCreationPayload = {
    collection: CollectionNames,
    formData: FormData
}

export const addToCollection = async ({ collection, formData } : ICollectionCreationPayload) => {

    if (formData.get('file')) return addToCollectionWithMedia({ collection, formData })

    const { Model } = getModelByCollectionName(collection)

    const payload = Object.fromEntries(formData)

    try {
        return await Model.create({ ...payload })
    }
    catch (error) {
        throw new Error(error as string)        
    }
}

export const addToCollectionWithMedia = async ({ collection, formData } : ICollectionCreationPayload) => {
    
    const { Model } = getModelByCollectionName(collection)
    let createdMedium;

    try {
        createdMedium = await createAndUploadMedia({ formData })
    }
    catch (error) {
        throw new Error(error as string)
    }

    const { MediumId, transaction } = createdMedium

    formData.delete('file')

    const creationPayload = { ...Object.fromEntries(formData), MediumId }

    let collectionItem;

    try {
        collectionItem = await Model.create({ ...creationPayload }, { transaction }) 
    }
    catch (error) {
        await transaction.rollback()
        throw new Error()
    }

    await transaction.commit()

    return collectionItem
} 

