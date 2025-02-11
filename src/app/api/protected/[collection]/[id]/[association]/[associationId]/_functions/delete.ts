import { getAssociationModelByName } from "@/app/api/protected/contests/[id]/[association]/_utils"
import { CollectionNames } from "@/types"
import { IAssociationNames } from "@/types/associations"

export const deleteAssociation = async ({ 
    collection,
    association,
    id,
    associationId 
} : {
    collection: CollectionNames,
    association: IAssociationNames,
    id: string,
    associationId: string
}) => {

    try {
        const { AssociationTable, collectionItemIdField, associationIdField } = getAssociationModelByName(association)
    
        if (!collectionItemIdField || !AssociationTable) 
            throw new Error('No se han encontrado asociaciones para esta colección.')
    
        const payload = { [collectionItemIdField]: id, [associationIdField]: associationId } // i.e. ContestId: id, MediumId: mediumId
    
        return await AssociationTable.destroy({ where: {...payload }}).then(data => data)
    }
    catch (error) {
        throw new Error('Error eliminando la asociación.')
    }
}