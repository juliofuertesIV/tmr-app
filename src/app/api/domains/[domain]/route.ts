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

    try {
        const contest = await Contest.findOne({ where: { domain }, include: [ Inscription ]})  
        
        return Response.json(
            constructAPIResponse({
                message: 'Found!',
                success: true,
                error: null,
                data: contest
            })
        ) 
    }
    catch (error) {
        return await handleApiError({
            req,
            error,
            route: '/api/protected/contests/domain/[domain]'
        })
    }
    
    
}
