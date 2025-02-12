import { constructAPIResponse } from "@/app/api/_functions";
import { Contest } from "@/database/models";
import { handleApiError } from "@/lib/errors";
import { NextRequest } from "next/server";
import { createContestAssociation, getAssociationModelByName } from "./_functions";
import { ContestAssociationNames } from "@/types/contests";

type RouteParams = {
    params: {
        id: string,
        association: ContestAssociationNames
    }
}

export const GET = async (req: NextRequest, { params } : RouteParams) => {

    const { id, association } = params
    
    const AssociationModel = getAssociationModelByName(association)

    let contest;
    let associationItems;

    try {
        contest = await Contest.findOne({ where: { id }, include: [ AssociationModel ]})
        associationItems = await AssociationModel.findAll()
    }
    catch (error) {
        return handleApiError({
            req,
            error,
            message: 'Error fetching.',
            route: `/api/contests/[id]/${ association }`
        })
    }

    return Response.json(
        constructAPIResponse({
            error: null,
            success: true,
            message: 'OK',
            data: { contest, associationItems }
        })
    )
}

export const POST = async (req: NextRequest, { params } : RouteParams) => {

    const { id, association } = params
    
    try {
        const formData = await req.formData()
        await createContestAssociation({ id, association, formData })
    }
    catch (error) {
        return await handleApiError({
            req,
            error,
            message: 'Unable to make association.',
            route: '/api/protected/contests/[id]/' + association
        })
    }

    return Response.json(
        constructAPIResponse({
            message: 'Associated.',
            success: true,
            error: null,
            data: null
        })
    )
}

