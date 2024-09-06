import { constructAPIResponse } from "@/app/api/_utils"
import { getAssociationModelByName } from "../../../_utils"
import { handleApiError } from "@/lib/errors"
import { ICollectionNames } from "@/types"
import { IAssociationNames } from "@/types/associations"
import { createMedia } from "@/lib/media/create"
import { ICollectionsWithMediaNames } from "@/types/media"

type Props = {
    collection: ICollectionNames,
    id: string,
    association: IAssociationNames,
    formData: FormData
}

export const createAssociationWithMedia = async ({ collection, association, id, formData } : Props) => {

    const { 
        AssociationTable,
        collectionItemIdField,
    } = getAssociationModelByName(association)

    if (!collectionItemIdField || !AssociationTable) 
        return await handleApiError({
            error: new Error('Bad request. Cannot find collectionItemIdField or Association Table.'),
            collection,
            route: `/api/contests/${ id }/media`,
            message: 'Fallo asociando elemento'
        })

    if (!(formData.get('file') as File).size) return await handleApiError({
        error: new Error('No hay archivo.'),
        collection,
        route: `/api/${ collection }/${ id }/${ association }`,
        message: 'Fallo asociando elemento'
    })

    if (!formData.get('domain')) return await handleApiError({
        route: 'create-media',
        error: new Error('No hay domain en la formData.'),
        message: 'Ausencia de domain.' 
    })
    
    const { MediumId, transaction } = await createMedia({ formData, collection: collection as ICollectionsWithMediaNames })

    const payload = { [collectionItemIdField]: id, MediumId } // i. e. ContestId, ParamId

    const data = await AssociationTable.create({ ...payload }, { transaction })
    .then(async (data) => {

        await transaction.commit()

        return data

    })
    .catch(async (error) => {
        return await handleApiError({
            transaction,
            error,
            collection,
            route: `/api/${ collection }/${ id }/${ association }`,
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

export const createAssociation = async ({ collection, id, association, formData} : Props) => {

    
    const associationId = formData.get('associationId') as string

    console.log({ association, collection, associationId })

    if (!associationId) {
        return await handleApiError({
            error: new Error('No associationId field in formData'),
            collection,
            route: `/api/${ collection }/${ id }/${ association }`,
            message: 'Fallo asociando elemento'
        })
    }

    const { 
        AssociationTable,
        collectionItemIdField,
        associationIdField 
    } = getAssociationModelByName(association)

    if (!collectionItemIdField || !AssociationTable) 
        return await handleApiError({
            error: new Error('Bad request. Cannot find collectionItemIdField or Association Table.'),
            collection,
            route: `/api/${ collection }/${ id }/${ association }`,
            message: 'Fallo asociando elemento'
        })

    const payload = { [collectionItemIdField]: id, [associationIdField]: associationId } // i. e. ContestId, ParamId

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
        return await handleApiError({
            error,
            collection,
            route: `/api/${ collection }/${ id }/${ association }`,
            message: 'Fallo asociando elemento'
        })
    }
}
