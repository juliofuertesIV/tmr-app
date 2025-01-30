import { handleApiError } from "@/lib/errors";
import { constructAPIResponse } from "../../_utils";
import { NextRequest } from "next/server";

type RouteParams = {
    params: {
        id: string
    }
}

export const GET = async (req: NextRequest, { params } : RouteParams) => {

    const { id } = params
    
    return await getContestById({ id })

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
