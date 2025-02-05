import { ICollectionNames } from "@/types"
import { getModelByCollectionName } from "../../contests/[id]/[association]/_utils"

type ICollectionCreationPayload = {
    collection: ICollectionNames,
    formData: FormData
}

export const addToCollection = async ({ collection, formData } : ICollectionCreationPayload) => {

    const { Model } = getModelByCollectionName(collection)

    const payload = Object.fromEntries(formData)

    try {
        return await Model.create({ ...payload })
    }
    catch (error) {
        throw new Error(error as string)        
    }
}

