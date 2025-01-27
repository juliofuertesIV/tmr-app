import { constructAPIResponse } from "@/app/api/_utils";
import { Contest } from "@/database/models";
import { Inscription } from "@/database/models";
import { handleApiError } from "@/lib/errors";
import { NextRequest } from "next/server";

type RouteParams = {
    params: {
        domain: string
    }
}

export const GET = async (req: NextRequest, { params } : RouteParams) => {

    const { domain } = params

    let contest; 
    try {
        contest = await Contest.findOne({ where: { domain }, include: [ Inscription ]})
        
    }
    catch (error) {
        return await handleApiError({
            error,
            route: '/api/contests/domain/[domain]'
        })
    }

    if (!contest) {
        return await handleApiError({
            error: new Error('No contest found.'),
            route: '/api/contests/domain/[domain]'
        })
    }
    
    return Response.json(
        constructAPIResponse({
            message: 'Found!',
            success: true,
            error: null,
            data: contest
        })
    )
}
