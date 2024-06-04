import { getAssociationModelByName } from "@/app/api/[collection]/_utils"
import { constructAPIResponse } from "@/app/api/_utils"
import { handleApiError } from "@/lib/errors"
import { ICollectionNames } from "@/lib/types"
import { IAssociationNames } from "@/lib/types/associations"

export const deleteAssociation = async ({ 
    collection,
    association,
    id,
    associationId 
} : {
    collection: ICollectionNames,
    association: IAssociationNames,
    id: string,
    associationId: string
}) => {

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