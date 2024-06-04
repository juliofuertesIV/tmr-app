import { ICollectionNames } from "@/types"
import { getModelByCollectionName } from "../_utils"
import { constructAPIResponse } from "../../_utils"

export async function getCollectionByName({ collection } : { collection: ICollectionNames }) {
    
    const { Model, options } = getModelByCollectionName(collection)

    const data = await Model.findAll({ ...options }).then(data => data)

    return Response.json(
        constructAPIResponse({
            message: 'OK!',
            success: true,
            error: null,
            data
        })
    )
}