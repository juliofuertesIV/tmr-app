import { handleApiError } from "@/lib/errors";
import { constructAPIResponse } from "../../_utils";
import { NextRequest } from "next/server";
import { getCollectionItemById } from "../../[collection]/[id]/_functions/get";
import { Contest } from "@/database/models";

type RouteParams = {
    params: {
        id: string
    }
}

//TO DO: SECURE THIS

export const GET = async (req: NextRequest, { params } : RouteParams) => {

    const { id } = params
    
    try {
        const contest = await Contest.findOne({ where: { id }}).then(data => data)

        return Response.json(
            constructAPIResponse({
                message: 'Fetched',
                success: true,
                error: null,
                data: contest
            })
        )
    }
    catch (error) {
        return handleApiError({
            error: error as string,
            route: '/api/contests/[id]'
        })
    }
}

export const PUT = async (req: NextRequest, { params } : RouteParams) => {

    const { id } = params

    let formData

    try {
        formData = await req.formData()
    }
    catch (error) {
        return await handleApiError({
            error,
            req,
            message: 'Unable to get FormData.',
            route: `/api/contests/[id]`
        })
    }

    try {
        await updateContest({ id, formData })
    }
    catch (error) {
        return await handleApiError({
            error,
            message: 'Unable to update item.',
            route: `/api/contest/[id]`
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

    const { id } = params

    return await deleteContest({ id })

}
