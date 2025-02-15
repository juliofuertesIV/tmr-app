import { CollectionNames } from "@/types";
import { updateCollectionItem } from "./_functions/update";
import { deleteCollectionItem } from "./_functions/delete";
import { handleApiError } from "@/lib/errors";
import { constructAPIResponse } from "../../../_functions";
import { NextRequest } from "next/server";
import { getCollectionItemById } from "./_functions/get";

type RouteParams = {
    params: {
        collection: CollectionNames,
        id: string
    }
}

/* export const GET = async (req: NextRequest, { params } : RouteParams) => {

    const { collection, id } = params
    
    try {
        const collectionItem = await getCollectionItemById({ collection, id })

        return Response.json(
            constructAPIResponse({
                message: 'Fetched.',
                success: true,
                error: null,
                data: collectionItem
            })
        )
    }
    catch (error) {
        return await handleApiError({
            req,
            error: error as string,
            message: 'Not found.',
            route: `/api/protected/${collection}/${id}`
        })
    }
} */

export const PUT = async (req: NextRequest, { params } : RouteParams) => {

    const { collection, id } = params

    let formData

    try {
        formData = await req.formData()
    }
    catch (error) {
        return await handleApiError({
            req,
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
            req,
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

export const DELETE = async (req: NextRequest, { params } : RouteParams) => {

    const { collection, id } = params

    try {
        await deleteCollectionItem({ collection, id })
    }
    catch (error) {
        return await handleApiError({
            req,
            error,
            message: 'Error deleting element',
            route: `/api/${ collection }/[id]`
        })
    }

    return Response.json(
        constructAPIResponse({ 
            message: "Elemento eliminado correctamente.",
            success: true,
            error: null,
            data: null
        })
    )
}
