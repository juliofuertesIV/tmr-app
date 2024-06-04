import { IOneOfCollectionNames } from "@/types";
import { getAssociationModelByName } from "../../../_utils";
import { constructAPIResponse } from "@/app/api/_utils";
import { IAssociationNames } from "@/types/associations";
import { handleApiError } from "@/app/api/_utils/errors";

type Params = { params: { collection: IOneOfCollectionNames, id: string, association: IAssociationNames, associationId: string }}

export const DELETE = async (req: Request, { params } : Params) => {

    const { collection, id, association, associationId } = params

    try {
        const { AssociationTable, collectionItemIdField, associationIdField } = getAssociationModelByName(association)
    
        if (!collectionItemIdField || !AssociationTable) {
            return await handleApiError({
                message: 'No se han encontrado asociaciones para esta colección.',
                collection,
                route: `/api/${ collection }/${ id }/${ association }/${ associationId }`,
                error: new Error('No collectionItemIdField or AssociationTable found')
            })
        }
    
        const payload = { [collectionItemIdField]: id, [associationIdField]: associationId } // i.e. ContestId: id, MediumId: mediumId
    
        const data = await AssociationTable.destroy({ where: {...payload }})
        .then(data => data)
    
        return Response.json(
            constructAPIResponse({
                message: 'Asociación eliminada correctamente.',
                success: true,
                error: null,
                data
            })
        )
    }
    catch (error) {
        await handleApiError({
            error,
            collection,
            route: `/api/${ collection }/${ id }/${ association }/${ associationId }`,
            message: 'Fallo eliminando la asociación'
        })
    }
}
