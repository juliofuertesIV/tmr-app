import { NextRequest } from "next/server";
import { handleApiError } from "@/lib/errors";
import { constructAPIResponse } from "@/app/api/_functions";
import { deleteContestAssociation } from "./_functions";
import { IContestAssociationNames } from "@/types/contests";

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
            req,
            error,
            message: 'Unable to make dissociation.',
            route: '/api/protected/contests/[id]/' + association,
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