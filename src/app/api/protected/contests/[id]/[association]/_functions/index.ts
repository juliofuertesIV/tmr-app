import { ContestGenre, ContestParam, ContestSocial, Genre, Param, SocialMedia } from "@/database/models"
import { IContestAssociationIdFieldNames, IContestAssociationNames } from "@/types/associations"

import { Model, ModelStatic } from "sequelize"

export const getAssociationModelByName = (association: IContestAssociationNames) => {
    
    const associationModelByIdField : { [key in IContestAssociationNames]:  ModelStatic<Model<any, any>> } = {
        params: Param,
        genres: Genre,
        social: SocialMedia
    } 

    return associationModelByIdField[association]
} 

export const getAssociationTableAndFieldByName = (association: IContestAssociationNames) => {
    
    const associationTableByIdField : { 
        [key in IContestAssociationNames]: { 
            table: ModelStatic<Model<any, any>>, 
            idField: IContestAssociationIdFieldNames 
        } 
    } = {
        params: { table: ContestParam, idField: 'ParamId' },
        genres: { table: ContestGenre, idField: 'GenreId' },
        social: { table: ContestSocial, idField: 'SocialMediumId' }
    } 

    return associationTableByIdField[association]
}


export const createContestAssociation = async ({ id, association, formData } : { id: string, association: IContestAssociationNames, formData: FormData }) => {
    
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
