import { IOneOfCollectionNames } from "@/types";
import { getAssociationModelByName, getModelByCollectionName } from "../../_utils";
import { constructAPIResponse } from "@/app/api/_utils";
import { IAssociationNames } from "@/types/associations";
import { handleApiError } from "@/app/api/_utils/errors";

type Params = { params: { collection: IOneOfCollectionNames, id: string, association: IAssociationNames }}

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

    const { collection, id, association } = params

    const formData = Object.fromEntries(await req.formData())

    const { associationId, isManyToMany } = formData

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
            await handleApiError({
                error,
                collection,
                route: `/api/${ collection }/${ id }/${ association }`,
                message: 'Fallo asociando elemento'
            })
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
        await handleApiError({
            error,
            collection,
            route: `/api/${ collection }/${ id }/${ association }`,
            message: 'Fallo asociando elementos'
        })
    }
}


