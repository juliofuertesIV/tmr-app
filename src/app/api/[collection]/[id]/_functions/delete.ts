import { ICollectionNames } from "@/types"
import { getModelByCollectionName } from "../../_utils"
import { constructAPIResponse } from "@/app/api/_utils"
import { handleApiError } from "@/errors"

type Props = {
    collection: ICollectionNames,
    id: string
}

export const deleteCollectionItem = async ({ collection, id } : Props) => {
    
    const { Model } = getModelByCollectionName(collection)

    try {
        const detroyed = await Model.destroy({ where: { id } })

        return Response.json(
            constructAPIResponse({ 
                message: "Elemento eliminado correctamente.",
                success: true,
                error: null,
                data: detroyed
            })
        )
    }
    catch (error) {
        await handleApiError({
            error,
            collection,
            route: '/api/delete',
        }) 
    }    
}