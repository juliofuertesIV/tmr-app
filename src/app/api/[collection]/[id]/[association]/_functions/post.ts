import { constructAPIResponse } from "@/app/api/_utils"
import { getAssociationModelByName } from "../../../_utils"
import { handleApiError } from "@/errors"
import { ICollectionNames, ICollectionsWithMediaNames } from "@/types"
import { IAssociationNames } from "@/types/associations"
import { createMedia } from "@/media/create"

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
        associationIdField 
    } = getAssociationModelByName(association)

    if (!collectionItemIdField || !AssociationTable) 
        return await handleApiError({
            error: new Error('Bad request. Cannot find collectionItemIdField or Association Table.'),
            collection,
            route: `/api/contests/${ id }/media`,
            message: 'Fallo asociando elemento'
        })

    const { MediumId } = await createMedia({ formData, collection: collection as ICollectionsWithMediaNames })

    const payload = { [collectionItemIdField]: id, [associationIdField]: MediumId } // i. e. ContestId, ParamId

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

export const createAssociation = async ({ collection, id, association , formData} : Props) => {

    const associationId = formData.get('associationId') as string

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
