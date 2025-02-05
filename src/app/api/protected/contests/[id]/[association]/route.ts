import { constructAPIResponse } from "@/app/api/_utils";
import { Contest } from "@/database/models";
import { handleApiError } from "@/lib/errors";
import { IContestAssociationNames } from "@/types/associations";
import { NextRequest } from "next/server";
import { getAssociationModelByName } from "./_functions";

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

        console.log('TRYING TO GET CONTESTSSSS')
        console.log('TRYING TO GET CONTESTSSSS')
        console.log('TRYING TO GET CONTESTSSSS')
        console.log('TRYING TO GET CONTESTSSSS')
        console.log('TRYING TO GET CONTESTSSSS')

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