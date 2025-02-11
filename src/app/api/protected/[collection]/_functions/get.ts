import { CollectionNames } from "@/types"
import { getModelByCollectionName } from "../../contests/[id]/[association]/_utils"

export async function getCollectionByName({ collection } : { collection: CollectionNames }) {
    
    const { Model, options } = getModelByCollectionName(collection)

    try {
        return await Model.findAll({ ...options }).then(data => data)
    }
    catch (error) {
        throw new Error(error as string)
    }

}