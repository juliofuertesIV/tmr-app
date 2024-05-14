import { IAssociationTypes, IOneOfCollectionNames } from "@/interfaces";
import { getAssociationModelByName } from "../../_utils";

type Params = { params: { collection: IOneOfCollectionNames, id: string, association: IAssociationTypes }}

export const GET = async (req: Request, { params } : Params) => {

    const { id, association } = params

    const { AssociationTable, collectionItemIdField } = getAssociationModelByName(association)

    const data = await AssociationTable
        .findAll({ where: { [collectionItemIdField]: id }})
        .then(data => data)

    return Response.json(data)

}
