import { ContestParam, ContestSocial, Param, SocialMedia } from "@/database/models"
import { ContestAssociationIdFieldNames, ContestAssociationNames } from "@/types/contests"

import { Model, ModelStatic } from "sequelize"

export const getAssociationModelByName = (association: ContestAssociationNames) => {
    
    const associationModelByIdField : { [key in ContestAssociationNames]:  ModelStatic<Model<any, any>> } = {
        params: Param,
        social: SocialMedia
    } 

    return associationModelByIdField[association]
} 

export const getAssociationTableAndFieldByName = (association: ContestAssociationNames) => {
    
    const associationTableByIdField : { 
        [key in ContestAssociationNames]: { 
            table: ModelStatic<Model<any, any>>, 
            idField: ContestAssociationIdFieldNames 
        } 
    } = {
        params: { table: ContestParam, idField: 'ParamId' },
        social: { table: ContestSocial, idField: 'SocialMediumId' }
    } 

    return associationTableByIdField[association]
}


export const createContestAssociation = async ({ id, association, formData } : { id: string, association: ContestAssociationNames, formData: FormData }) => {
    
    const associatedItemId = formData.get('associationItemId') as string
    
    const { table: AssociationTable, idField } = getAssociationTableAndFieldByName(association)

    const payload = { ContestId: id, [idField]: associatedItemId } // TO DO i. e. ParamId, GenreId, SponsorId

    try {
        await AssociationTable.create({ ...payload })
    }
    catch (error) {
        throw new Error('Fallo asociando el elemento.')
    }
}
