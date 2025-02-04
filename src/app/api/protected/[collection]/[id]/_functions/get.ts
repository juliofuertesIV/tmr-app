import { ICollectionNames } from "@/types"
import { getModelByCollectionName } from "../../_utils"

type Props = {
    collection: ICollectionNames,
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