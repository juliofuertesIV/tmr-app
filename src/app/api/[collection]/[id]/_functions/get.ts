import { IOneOfCollectionNames } from "@/types"
import { getModelByCollectionName } from "../../_utils"
import { constructAPIResponse } from "@/app/api/_utils"

type Props = {
    collection: IOneOfCollectionNames,
    id: string
}

export const getItemById = async ({ collection, id } : Props) => {
    
    const { Model, options } = getModelByCollectionName(collection)

    try {
        const data = await Model.findOne({ where: { id }, ...options }).then(data => data)
        return Response.json(
            constructAPIResponse({ 
                message: 'OK',
                success: true,
                error: null,
                data
            })
        )
    }
    catch (error) {
        return Response.json(
            constructAPIResponse({ 
                message: 'Failed to fetch',
                success: false,
                error,
                data: null 
            })
        )
    }
}