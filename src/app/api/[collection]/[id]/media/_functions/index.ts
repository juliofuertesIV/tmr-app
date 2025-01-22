import { ICollectionNames, ICollectionsWithMedia } from "@/types"
import { ICollectionsWithMediaNames } from "@/types/media"
import { getAssociationModelByName } from "../../../_utils"
import { IAssociationNames } from "@/types/associations"
import { Model, ModelStatic } from "sequelize"
import { handleApiError } from "@/lib/errors"
import { constructAPIResponse } from "@/app/api/_utils"
import { createMedia } from "@/lib/media/create"
import { deleteMedia } from "@/lib/media/delete"

export const findMediumIdByRole = ({ 
    collectionItem,
    role } : {
    collectionItem: ICollectionsWithMedia,
    role: FormDataEntryValue | null
    }) => {

    if (!role) throw new Error('No role was provided. Role: ' + role)

    const currentMediaId = collectionItem.Media.find((media) => media.role === role)?.id

    if (!currentMediaId) return null

    return currentMediaId
}

export const getCurrentMediaId = async ({
    collectionItem,
    formData,
} : { 
    collectionItem: ICollectionsWithMedia,
    formData: FormData
}) => {

    const role = formData.get('role')

    if (!role) throw new Error('No role was provided. Role: ' + role)
        
    const id = findMediumIdByRole({ collectionItem, role })

    return id

}

export const updateAssociatedMedia = async ({ 
    collection,
    id,
    formData
} : { 
    collection: ICollectionsWithMediaNames,
    id: string,
    formData: FormData,
}) => {
    
    const role = formData.get('role') as string | null
    const mediaId = formData.get('currentMediumId') as string | null

    if (!role || !mediaId) return handleApiError({
        error: 'No role or id found',
        route: '/api/media',
        collection,
        message: `Role: ${ role }. MediaId: ${ mediaId }`
    })

    const result = await deleteMedia({ mediaId })

    if (result.error) {
        return await handleApiError({
            ...result
        })
    }

    return await createAssociationWithMedia({
        collection,
        id,
        formData
    })
}



export const createAssociationWithMedia = async ({ 
        collection,
        id,
        formData 
    } : {        
        collection: ICollectionNames,
        id: string,
        formData: FormData
    }) => {

    const { 
        AssociationTable,
        collectionItemIdField,
    } = getAssociationModelByName('media')

    const result = checkForPayloadErrors({
        formData,
        collection,
        id,
        association: 'media',
        collectionItemIdField,
        AssociationTable
    })

    if (result.error) {
        return await handleApiError({
            ...result
        })
    }

    const { MediumId, transaction } = await createMedia({ formData, collection: collection as ICollectionsWithMediaNames })

    const payload = { [(collectionItemIdField as string)]: id, MediumId } // i. e. ContestId: id, ParamId: id

    const data = await (AssociationTable as ModelStatic<Model<any, any>>).create({ ...payload }, { transaction })
    .then(async (data) => {

        await transaction.commit()

        return data

    })
    .catch(async (error) => {
        return await handleApiError({
            transaction,
            error,
            collection,
            route: `/api/${ collection }/${ id }/media`,
            message: 'Fallo asociando elemento'
        })
    }) 

    return Response.json(
        constructAPIResponse({
            message: 'Elementos asociados correctamente.',
            error: null,
            success: true,
            data
        })
    )
}

const checkForPayloadErrors = ({ 
    formData,
    collection,
    id,
    association,
    collectionItemIdField,
    AssociationTable 
}: {
    formData: FormData,
    collection: ICollectionNames,
    id: string,
    association: IAssociationNames,
    collectionItemIdField: string | null,
    AssociationTable: ModelStatic<Model<any, any>> | null
}) => {

    if (!collectionItemIdField || !AssociationTable) 
        return {
            error: new Error('Bad request. Cannot find collectionItemIdField or Association Table.'),
            collection,
            route: `/api/contests/${ id }/media`,
            message: 'Fallo asociando elemento'
        }

    if (!(formData.get('file') as File).size) 
        return {
            error: new Error('No hay archivo.'),
            collection,
            route: `/api/${ collection }/${ id }/${ association }`,
            message: 'Fallo asociando elemento'
        }

    if (!formData.get('domain')) 
        return {
            route: 'create-media',
            error: new Error('No hay domain en la formData.'),
            message: 'Ausencia de domain.' 
        }

    return { error: null }
}