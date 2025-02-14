import { getCollectionItemFromDatabase } from "@/lib/database/functions/collections"
import { CollectionNames } from "@/types"
import { AssociationNames, CollectionsWithAssociationNames } from "@/types/associations"
import { getAssociationKeyAndIdFieldByCollectionName } from "../_utils"

export const getCollectionAssociationPageData = async ({ 
    collection,
    id,
    association 
} : {
    collection: CollectionsWithAssociationNames,
    id: string,
    association: AssociationNames 
}) => {

    try {
        const item = await getCollectionItemFromDatabase({ collectionName: collection as CollectionNames, id })
    
        const { associationKey, associationIdField, model: AssociationModel } = getAssociationKeyAndIdFieldByCollectionName({ collectionName: collection })
    
        const associationItems = await AssociationModel.findAll()
        .then(data => data)
        .catch(error => { throw new Error(error as string)})
    
        const data = {
            item,
            associationKey,
            associationIdField,
            associationItems
        }

        return JSON.parse(JSON.stringify(data))
    }
    catch (error) {
        throw new Error(error as string)
    }
}
