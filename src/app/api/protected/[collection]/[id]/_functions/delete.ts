import { ICollectionNames } from "@/types"
import { getModelByCollectionName } from "../../../contests/[id]/[association]/_utils"

type Props = {
    collection: ICollectionNames,
    id: string
}

export const deleteCollectionItem = async ({ collection, id } : Props) => {
    
    const { Model } = getModelByCollectionName(collection)

    try {
        return await Model.destroy({ where: { id } })

    }
    catch (error) {
        throw new Error(error as string)
    }    
}