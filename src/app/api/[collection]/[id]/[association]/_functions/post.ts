import { constructAPIResponse } from "@/app/api/_utils"
import { getAssociationModelByName } from "../../../_utils"
import { handleApiError } from "@/lib/errors"
import { ICollectionNames } from "@/types"
import { IAssociationNames } from "@/types/associations"

type Props = {
    collection: ICollectionNames,
    id: string,
    association: IAssociationNames,
    formData: FormData
}


export const createAssociation = async ({ collection, id, association, formData} : Props) => {
    
    const associationId = formData.get('associationId') as string

    if (!associationId) {
        return await handleApiError({
            error: new Error('No associationId field in formData'),
            collection,
            route: `/api/collections/${ collection }/${ id }/${ association }`,
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
            route: `/api/collections/${ collection }/${ id }/${ association }`,
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
            route: `/api/collections/${ collection }/${ id }/${ association }`,
            message: 'Fallo asociando elemento'
        })
    }
}

