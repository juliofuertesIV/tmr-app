import { IOneOfCollectionNames } from "@/types";
import { getAssociationModelByName } from "../../../_utils";
import { constructAPIResponse } from "@/app/api/_utils";
import { IAssociationNames } from "@/types/associations";
import { logError } from "@/app/api/_utils/errors";


type Params = { params: { collection: IOneOfCollectionNames, id: string, association: IAssociationNames, associationId: string }}

export const DELETE = async (req: Request, { params } : Params) => {

    const { collection, id, association, associationId } = params

    try {
        const { AssociationTable, collectionItemIdField, associationIdField } = getAssociationModelByName(association)
    
        if (!collectionItemIdField || !AssociationTable) throw new Error('Bad request.')
    
        const payload = { [collectionItemIdField]: id, [associationIdField]: associationId }
    
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

        await logError({ 
            error, 
            collection,
            route: `/api/${ collection }/${ id }/${ association }/${ associationId }`
        })

        return Response.json(
            constructAPIResponse({
                message: 'Fallo eliminando la asociación.',
                success: false,
                error,
                data: null
            })
        )
    }
}
