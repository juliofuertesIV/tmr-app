import { constructAPIResponse } from "@/app/api/_utils";
import { Contest } from "@/database/models";
import { handleApiError } from "@/lib/errors";
import { IContestAssociationNames } from "@/types/associations";
import { NextRequest } from "next/server";
import { createContestAssociation, getAssociationModelByName } from "./_functions";

type RouteParams = {
    params: {
        id: string,
        association: IContestAssociationNames
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
            error,
            message: 'Unable to make association.',
            route: '/api/protected/contests/[id]/' + association,
            req
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

