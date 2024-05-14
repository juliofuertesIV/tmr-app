import { IAssociationTypes, IOneOfCollectionNames } from "@/interfaces";
import { getAssociationModelByName } from "../../../_utils";


type Params = { params: { collection: IOneOfCollectionNames, id: string, association: IAssociationTypes, associationId: string }}

// localhost/api/contests/contestId/genres/genreId POST || DELETE

export const POST = async (req: Request, { params } : Params) => {

    const { id, association, associationId } = params

    const { AssociationTable, collectionItemIdField, associationIdField } = getAssociationModelByName(association)

    const payload = { [collectionItemIdField]: id, [associationIdField]: associationId }

    const data = await AssociationTable.create({ ...payload })
        .then(data => data)

    return Response.json(data)
}


export const DELETE = async (req: Request, { params } : Params) => {

    const { id, association, associationId } = params

    const { AssociationTable, collectionItemIdField, associationIdField } = getAssociationModelByName(association)

    const payload = { [collectionItemIdField]: id, [associationIdField]: associationId }

    const data = await AssociationTable.destroy({ where: {...payload }})
    .then(data => data)

    return Response.json(data)

}
