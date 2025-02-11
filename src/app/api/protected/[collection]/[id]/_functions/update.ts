import { getModelByCollectionName } from "../../../contests/[id]/[association]/_utils"
import { sequelize } from '@/database/models'
import { CollectionNames } from "@/types"


type Props = {
    formData: FormData,
    collection: CollectionNames,
    id: string
}

export const updateCollectionItem = async ({ collection, formData, id } : Props) => {

    const { Model } = getModelByCollectionName(collection)

    const payload = Object.fromEntries(formData)

    const transaction = await sequelize.transaction()

    try {
        await Model.update({ ...payload }, { where: { id }, transaction })
        await transaction.commit()
    }
    catch (error) {
        throw new Error(error as string)
    }
}
