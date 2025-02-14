import { CollectionNames } from "@/types"
import { AssociationNames } from "@/types/associations"
import { getAssociationTableAndFieldByName } from "../../_functions"


export const deleteAssociation = async ({ 
    collection,
    association,
    id,
    associationId 
} : {
    collection: CollectionNames,
    association: AssociationNames,
    id: string,
    associationId: string
}) => {

    
    const { AssociationTable, collectionItemIdField, associationIdField } = getAssociationTableAndFieldByName(association)

    if (!collectionItemIdField || !AssociationTable) 
        throw new Error('No se han encontrado asociaciones para esta colección.')

    const payload = { [collectionItemIdField]: id, [associationIdField]: associationId } // i.e. FooterId, SponsorId

    return await AssociationTable.destroy({ where: {...payload }}).then(data => data).catch(error => { throw new Error(error as string )})
}