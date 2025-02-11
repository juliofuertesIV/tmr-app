import { IAssociationNames, IAssociation, ICollectionsWithAssociations } from "@/types/associations"
import { getAssociationModelByName, getModelByCollectionName } from "../../../../contests/[id]/[association]/_utils"
import { CollectionNames } from "@/types"

type Props = {
    collection: CollectionNames,
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
    
        return data

    }
    catch (error) {
        throw new Error('Error fetching association')
    }

}