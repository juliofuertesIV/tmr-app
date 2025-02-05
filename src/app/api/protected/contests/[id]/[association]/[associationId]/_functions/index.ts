import { IContestAssociationNames } from "@/types/associations"
import { getAssociationTableAndFieldByName } from "../../_functions"

export const deleteContestAssociation = async ({ 
    id,
    association,
    associationId
} : {
    id: string,
    association: IContestAssociationNames,
    associationId: string
}) => {
    
    const { table: AssociationTable, idField } = getAssociationTableAndFieldByName(association)

    try {
        await AssociationTable.destroy({ 
            where: { 
                ContestId: id, 
                [idField]: associationId 
            }
        })
        .then(data => data)
    }
    catch (error) {
        throw new Error(error as string)
    }
}

