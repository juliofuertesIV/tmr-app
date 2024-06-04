import { getModelByCollectionName } from "../../_utils"
import { IOneOfCollectionNames } from "@/types"
import { sequelize } from "@/database"
import { constructAPIResponse } from "@/app/api/_utils"
import { handleApiError } from "@/app/api/_utils/errors"

type Props = {
    req: Request,
    collection: IOneOfCollectionNames,
    id: string
}

export const updateCollectionItem = async ({ collection, req, id } : Props) => {

    const { Model } = getModelByCollectionName(collection)

    const payload = Object.fromEntries(await req.formData())

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
        return handleApiError({
            transaction,
            error, 
            collection,
            route: `/api/${ collection }/${ id }`
        })
    }
}