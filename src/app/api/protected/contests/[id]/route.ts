import { handleApiError } from "@/lib/errors";
import { NextRequest } from "next/server";
import { Contest, Media } from "@/database/models";
import { deleteContest, updateContest } from "./_functions";
import { constructAPIResponse } from "@/app/api/_utils";

type RouteParams = {
    params: {
        id: string
    }
}

export const GET = async (req: NextRequest, { params } : RouteParams) => {

    const { id } = params
    
    try {
        const contest = await Contest.findOne({ 
            where: { id },
            include: [
                { model: Media, as: 'Logo' },
                { model: Media, as: 'Frame' },
                { model: Media, as: 'Banner' },
                { model: Media, as: 'Favicon' },
            ],
        })
        .then(data => data)

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
            route: '/api/protected/contests/[id]'
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
            route: `/api/protected/contests/[id]`
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

    try {
        await deleteContest({ id })
    }
    catch (error) {
        return await handleApiError({
            error,
            route: '/api/protected/contests/[id]'
        })
    }

    return Response.json(
        constructAPIResponse({
            message: 'Deleted ok.',
            success: true,
            error: null,
            data: null
        })
    )

}
