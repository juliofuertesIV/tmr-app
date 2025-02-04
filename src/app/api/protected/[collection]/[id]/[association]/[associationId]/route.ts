import { ICollectionNames } from "@/types";
import { IAssociationNames } from "@/types/associations";
import { deleteAssociation } from "./_functions/delete";
import { constructAPIResponse } from "@/app/api/_utils";
import { handleApiError } from "@/lib/errors";

type Params = { params: { collection: ICollectionNames, id: string, association: IAssociationNames, associationId: string }}

export const DELETE = async (req: Request, { params } : Params) => {

    const { collection, id, association, associationId } = params

    try {
        await deleteAssociation({ collection, id, association, associationId })
    } catch (error) {
        return await handleApiError({
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
