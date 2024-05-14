import { IAssociationTypes, IOneOfCollectionNames } from "@/interfaces";
import { getAssociationModelByName, getModelByCollectionName } from "../../../_utils";
import { constructAPIResponse } from "@/app/api/_utils";


type Params = { params: { collection: IOneOfCollectionNames, id: string, association: IAssociationTypes, associationId: string }}

export const POST = async (req: Request, { params } : Params) => {

    const { collection, id, association, associationId } = params

    const { isManyToMany } = Object.fromEntries(await req.formData()) || false

    if (isManyToMany) {

        const { 
            AssociationTable,
            collectionItemIdField,
            associationIdField 
        } = getAssociationModelByName(association)

        if (!collectionItemIdField || !AssociationTable) throw new Error('Bad request.')

        const payload = {
            [collectionItemIdField]: id,
            [associationIdField]: associationId 
        }
    
        try {
            const data = await AssociationTable.create({ ...payload }).then(data => data)
            return Response.json(
                constructAPIResponse({
                    message: 'Elementos asociados correctamente.',
                    error: null,
                    success: true,
                    data
                })
            )
        }
        catch (error) {
            return Response.json(
                constructAPIResponse({
                    message: 'Fallo asociando elementos.',
                    error,
                    success: false,
                    data: null
                })
            )
        }    
    }

    const { associationIdField } = getAssociationModelByName(association)

    const { Model } = getModelByCollectionName(collection)

    const payload = { [associationIdField]: associationId }

    try {
        const data = await Model.update({ ...payload }, { where: { id }})
        return Response.json(
            constructAPIResponse({
                message: 'Elementos asociados correctamente.',
                error: null,
                success: true,
                data
            })
        )
    }
    catch (error) {
        return Response.json(
            constructAPIResponse({
                message: 'Fallo asociando elementos.',
                error,
                success: false,
                data: null
            })
        )
    }
}


export const DELETE = async (req: Request, { params } : Params) => {

    const { id, association, associationId } = params

    const { AssociationTable, collectionItemIdField, associationIdField } = getAssociationModelByName(association)

    if (!collectionItemIdField || !AssociationTable) throw new Error('Bad request.')

    const payload = { [collectionItemIdField]: id, [associationIdField]: associationId }

    const data = await AssociationTable.destroy({ where: {...payload }})
    .then(data => data)

    return Response.json(data)
}
