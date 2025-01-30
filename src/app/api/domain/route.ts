import { Contest } from "@/database/models";
import { handleApiError } from "@/lib/errors";
import { NextRequest } from "next/server";
import { constructAPIResponse } from "../_utils";

export const GET = async (req: NextRequest) => {

    const data = await Contest.findAll({ attributes: ['name', 'metaUrl', 'domain']}).then(data => data)
    .catch(error => {
        return handleApiError({
            error,
            route: '/api/domains',
            message: 'Error getting domain.'
        })
    })

    return Response.json(
        constructAPIResponse({ 
            message: 'Domains fetched ok.',
            success: true,
            error: null,
            data
        })
    )
}