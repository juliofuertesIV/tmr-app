import { getModelByCollectionName } from "../../../contests/[id]/[association]/_utils"
import { sequelize } from '@/database/models'
import { constructAPIResponse } from "@/app/api/_utils"
import { handleApiError } from "@/lib/errors"
import { ICollectionNames } from "@/types"

type Props = {
    formData: FormData,
    collection: ICollectionNames,
    id: string
}

export const updateCollectionItem = async ({ collection, formData, id } : Props) => {

    const { Model } = getModelByCollectionName(collection)

    const payload = Object.fromEntries(formData)

    const transaction = await sequelize.transaction()

    try {
        const affectedRows = await Model.update({ ...payload }, { where: { id }, transaction })
        await transaction.commit()

        return Response.json(
            constructAPIResponse({ 
                message: "Elemento editado correctamente.",
                success: true,
                error: null,
                data: affectedRows 
            })
        )
    }
    catch (error) {
        return await handleApiError({
            error, 
            collection,
            route: `/api/collections/${ collection }/${ id }`
        })
    }
}
