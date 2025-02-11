import { CollectionNames } from "@/types";
import { deleteAssociation } from "./_functions/delete";
import { constructAPIResponse } from "@/app/api/_functions";
import { handleApiError } from "@/lib/errors";
import { NextRequest } from "next/server";

type Params = { params: { collection: CollectionNames, id: string, association: string, associationId: string }}

export const DELETE = async (req: NextRequest, { params } : Params) => {

    const { collection, id, association, associationId } = params

    try {
        await deleteAssociation({ collection, id, association, associationId })
    } catch (error) {
        return await handleApiError({
            req,
            error,
            collection,
            route: `/api/collections/${ collection }/${ id }/${ association }/${ associationId }`,
        })
    }

    return Response.json(
        constructAPIResponse({
            message: 'Asociación eliminada correctamente.',
            success: true,
            error: null,
            data: null
        })
    )

}
