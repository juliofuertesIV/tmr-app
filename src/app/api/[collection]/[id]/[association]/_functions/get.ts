import { IAssociationNames } from "@/types/associations"
import { getAssociationModelByName } from "../../../_utils"
import { ICollectionNames } from "@/types"
import { handleApiError } from "@/app/api/_utils/errors"

type Props = {
    collection: ICollectionNames,
    id: string,
    association: IAssociationNames,
}

export const getAssociation = async ({ collection, id, association } : Props) => {
    
    const { AssociationTable, collectionItemIdField } = getAssociationModelByName(association)

    if (!collectionItemIdField || !AssociationTable) {
        return await handleApiError({
            error: new Error('Bad request. Cannot find collectionItemIdField or Association Table.'),
            collection,
            route: `/api/${ collection }/${ id }/${ association }`,
            message: 'Fallo asociando elemento'
        })
    }

    const data = await AssociationTable
        .findAll({ where: { [collectionItemIdField]: id }})
        .then(data => data)

    return Response.json(data)    
}