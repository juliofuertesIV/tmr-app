import { getAssociationModelByName, getModelByCollectionName } from "@/app/api/[collection]/_utils"
import { constructAPIResponse } from "@/app/api/_utils"
import { handleApiError } from "@/app/api/_utils/errors"
import { ICollectionNames } from "@/types"
import { IAssociationNames } from "@/types/associations"


export const deleteSimpleAssociation = async ({ 
    collection,
    id,
    association,
}: {
    collection: ICollectionNames,
    id: string,
    association: IAssociationNames,
}) => {
    const { associationIdField } = getAssociationModelByName(association)

    const { Model } = getModelByCollectionName(collection)

    const payload = { [associationIdField]: null }

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

export const deleteManyToManyAssociation = async ({ 
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



type Props = {
    isManyToMany: FormDataEntryValue,
    formData: FormData,
    collection: ICollectionNames,
    association: IAssociationNames,
    associationId: string,
    id: string,
}

export const deleteAssociation = async ({ collection, id, association, associationId, isManyToMany } : Props) => {
    
    if (isManyToMany === 'true') 
        return await deleteManyToManyAssociation({ collection, id, association, associationId })

    return await deleteSimpleAssociation({ collection, id, association })
}