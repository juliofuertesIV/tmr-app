import { Contest } from "@/database/models";
import { handleApiError } from "@/lib/errors";
import { NextRequest } from "next/server";
import { constructAPIResponse } from "../_functions";

export const GET = async (req: NextRequest) => {

    const data = await Contest.findAll({ attributes: ['domain']}).then(data => data)
    .catch(error => {
        return handleApiError({
            req,
            error,
            route: '/api/domains',
            message: 'Error getting domain.'
        })
    })

    return Response.json(
        constructAPIResponse({ 
            message: 'Domains fetched ok. Route to be secured soon.',
            success: true,
            error: null,
            data
        })
    )
}