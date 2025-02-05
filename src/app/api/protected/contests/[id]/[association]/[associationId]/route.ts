import { IContestAssociationNames } from "@/types/associations";
import { NextRequest } from "next/server";
import { handleApiError } from "@/lib/errors";
import { constructAPIResponse } from "@/app/api/_utils";
import { deleteContestAssociation } from "./_functions";

type Params = {
    params: {
        id: string,
        association: IContestAssociationNames,
        associationId: string
    }
}

export const DELETE = async (req: NextRequest, { params } : Params) => {

    const { id, association, associationId } = params

    try {
        await deleteContestAssociation({ id, association, associationId })
    }
    catch (error) {
        return await handleApiError({
            error,
            message: 'Unable to make dissociation.',
            route: '/api/protected/contests/[id]/' + association,
            req
        })
    }
    
    return Response.json(
        constructAPIResponse({
            message: 'Dissociated.',
            success: true,
            error: null,
            data: null
        })
    )
}