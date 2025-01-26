import { ICollectionNames } from "@/types";
import { updateCollectionItem } from "./_functions/update";
import { deleteCollectionItem } from "./_functions/delete";
import { getCollectionItemById } from "./_functions/get";
import { handleApiError } from "@/lib/errors";
import { constructAPIResponse } from "../../_utils";

type RouteParams = {
    params: {
        collection: ICollectionNames,
        id: string
    }
}

export const GET = async (req: Request, { params } : RouteParams) => {

    const { collection, id } = params
    
    return await getCollectionItemById({ collection, id })

}

export const PUT = async (req: Request, { params } : RouteParams) => {

    const { collection, id } = params

    let formData

    try {
        formData = await req.formData()
    }
    catch (error) {
        return await handleApiError({
            error,
            message: 'Unable to get FormData.',
            route: `/api/${ collection }/[id]`
        })
    }

    try {
        await updateCollectionItem({ collection, id, formData })
    }
    catch (error) {
        return await handleApiError({
            error,
            message: 'Unable to update item.',
            route: `/api/${ collection }/[id]`
        })
    }

    return Response.json(
        constructAPIResponse({
            message: 'Elemento actualizado correctamente.',
            success: true,
            error: null,
            data: null
        })
    )
}

export const DELETE = async (req: Request, { params } : RouteParams) => {

    const { collection, id } = params

    return await deleteCollectionItem({ collection, id })

}
