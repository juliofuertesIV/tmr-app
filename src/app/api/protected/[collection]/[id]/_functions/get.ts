import { CollectionNames } from "@/types"
import { getModelByCollectionName } from "../../../contests/[id]/[association]/_utils"

type Props = {
    collection: CollectionNames,
    id: string
}

export const getCollectionItemById = async ({ collection, id } : Props) => {
    
    const { Model, options } = getModelByCollectionName(collection)

    try {
        return await Model.findOne({ where: { id }, ...options }).then(data => data)
    }
    catch (error) {
        throw new Error(error as string)
    }
}