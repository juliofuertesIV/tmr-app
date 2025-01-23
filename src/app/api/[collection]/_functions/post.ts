import { ICollectionNames } from "@/types"
import { getModelByCollectionName } from "../_utils"
import { constructAPIResponse } from "../../_utils"
import { handleApiError } from "@/lib/errors"
import { ICollectionsWithMediumNames } from "@/types/media"

type ICollectionCreationPayload = {
    collection: ICollectionNames,
    formData: FormData
}

export const addToCollection = async ({ collection, formData } : ICollectionCreationPayload) => {

    const { Model } = getModelByCollectionName(collection)

    const payload = Object.fromEntries(formData)

    try {
        const data = await Model.create({ ...payload })
        
        return Response.json(
            constructAPIResponse({ 
                message: "Elemento creado correctamente.",
                success: true,
                error: null,
                data 
            })
        )
    }
    catch (error) {

        return await handleApiError({
            error, 
            collection,
            route: `/api/${ collection }`
        })
        
    }
}

