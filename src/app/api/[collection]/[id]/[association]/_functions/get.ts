import { IAssociationNames, IAssociation, ICollectionsWithAssociations } from "@/types/associations"
import { getAssociationModelByName, getModelByCollectionName } from "../../../_utils"
import { ICollectionNames } from "@/types"
import { constructAPIResponse } from "@/app/api/_utils"
import { handleApiError } from "@/lib/errors"

type Props = {
    collection: ICollectionNames,
    id: string,
    association: IAssociationNames,
}

export const getAssociation = async ({ collection, id, association } : Props) => {
    
   const { AssociationModel, associationIdField, associationKey, options: associationOptions } = getAssociationModelByName(association)
    const { Model, options } = getModelByCollectionName(collection)

    try {

        const item = await Model.findOne({ where: { id }, ...options }).then(data => data) as unknown as ICollectionsWithAssociations
        const associationItems = await AssociationModel.findAll({ ...associationOptions }).then(data => data) as unknown as IAssociation[]
    
        const data = {
            item, 
            associationItems,
            associationKey,
            associationIdField,
        } 
    
        return Response.json(constructAPIResponse({
            message: 'OK',
            success: true,
            data,
            error: null
        }))

    }
    catch (error) {
        return await handleApiError({
            error,
            message: 'Error fetching association',
            route: '/collection/id/association',
            collection,
        })
    }

}