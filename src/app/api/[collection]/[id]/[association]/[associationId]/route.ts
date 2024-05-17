import { IAssociationTypes, IOneOfCollectionNames } from "@/interfaces";
import { getAssociationModelByName } from "../../../_utils";
import { constructAPIResponse } from "@/app/api/_utils";


type Params = { params: { collection: IOneOfCollectionNames, id: string, association: IAssociationTypes, associationId: string }}

export const DELETE = async (req: Request, { params } : Params) => {

    const { id, association, associationId } = params

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
