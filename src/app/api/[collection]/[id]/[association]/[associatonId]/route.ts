import { IAssociationTypes, IOneOfCollectionNames } from "@/interfaces";
import { getAssociationModelByName } from "../../../_utils";


type Params = { params: { collection: IOneOfCollectionNames, id: string, association: IAssociationTypes, associationId: string }}

export const DELETE = async (req: Request, { params } : Params) => {

    const { id, association, associationId } = params

    const { AssociationTable, collectionItemIdField, associationIdField } = getAssociationModelByName(association)

    if (!collectionItemIdField || !AssociationTable) throw new Error('Bad request.')

    const payload = { [collectionItemIdField]: id, [associationIdField]: associationId }

    const data = await AssociationTable.destroy({ where: {...payload }})
    .then(data => data)

    return Response.json(data)
}
