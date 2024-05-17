import { IAssociationTypes, IOneOfCollectionNames } from "@/interfaces";
import { getAssociationModelByName, getModelByCollectionName } from "../../_utils";
import { constructAPIResponse } from "@/app/api/_utils";

type Params = { params: { collection: IOneOfCollectionNames, id: string, association: IAssociationTypes }}

export const GET = async (req: Request, { params } : Params) => {

    const { id, association } = params

    const { AssociationTable, collectionItemIdField } = getAssociationModelByName(association)

    if (!collectionItemIdField || !AssociationTable) throw new Error('Bad request.')

    const data = await AssociationTable
        .findAll({ where: { [collectionItemIdField]: id }})
        .then(data => data)

    return Response.json(data)

}


export const POST = async (req: Request, { params } : Params) => {

    const { collection, id, association, } = params

    const { associationId, isManyToMany } = Object.fromEntries(await req.formData()) || false

    console.log({
        collection,
        id,
        association,
        associationId,
        isManyToMany
    })

    if (isManyToMany === "true") {

        const { 
            AssociationTable,
            collectionItemIdField,
            associationIdField 
        } = getAssociationModelByName(association)

        if (!collectionItemIdField || !AssociationTable) throw new Error('Bad request. Cannot find collectionItemIdField or Association Table.')

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


