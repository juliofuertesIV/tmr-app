import { ICollectionNames } from "@/types";
import { IAssociationNames } from "@/types/associations";
import { deleteAssociation } from "./_functions/delete";

type Params = { params: { collection: ICollectionNames, id: string, association: IAssociationNames, associationId: string }}

export const DELETE = async (req: Request, { params } : Params) => {

    const { collection, id, association, associationId } = params

    return await deleteAssociation({ collection, id, association, associationId })

}
