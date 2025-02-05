import { ContestGenre, ContestParam, ContestSocial } from "@/database/models"
import { IContestAssociationNames } from "@/types/associations"

import { Model, ModelStatic } from "sequelize"

export const getAssociationModelByName = (association: IContestAssociationNames) => {
    
    const associationModelByIdField : { [key in IContestAssociationNames]:  ModelStatic<Model<any, any>> } = {
        params: ContestParam,
        genres: ContestGenre,
        social: ContestSocial
    } 

    return associationModelByIdField[association]
} 


export const createContestAssociation = async ({ id, association, formData } : { id: string, association: IContestAssociationNames, formData: FormData }) => {
    
    const associatedItemId = formData.get('associatedItemId') as string
    
    const AssociationTable = getAssociationModelByName(association)

    const payload = { ContestId: id, ['asfd']: associatedItemId } // TO DO i. e. ParamId, GenreId, SponsorId

    try {
        return await AssociationTable.create({ ...payload }).then(data => data)
    }
    catch (error) {
        throw new Error('Fallo asociando el elemento.')
    }
}
