import { IOneOfCollectionNames } from "@/types"
import { getModelByCollectionName } from "../../_utils"
import { sequelize } from "@/database"
import { constructAPIResponse } from "@/app/api/_utils"
import { logError } from "@/app/api/_utils/errors"

type Props = {
    collection: IOneOfCollectionNames,
    id: string
}

export const deleteElement = async ({ collection, id } : Props) => {
    const { Model } = getModelByCollectionName(collection)

    const transaction = await sequelize.transaction()

    try {
        const elementsDestroyed = await Model.destroy({ where: { id }, transaction })
        await transaction.commit()

        return Response.json(
            constructAPIResponse({ 
                message: "Elemento eliminado correctamente.",
                success: true,
                error: null,
                data: elementsDestroyed
            })
        )
    }
    catch (error) {
        await transaction.rollback();

        await logError({ 
            error, 
            collection,
            route: `/api/${ collection }/${ id }`
        })
        
        return Response.json(
            constructAPIResponse({ 
                message: "No se ha podido eliminar el elemento.",
                success: true,
                error,
                data: null 
            })
        )
    }    
}