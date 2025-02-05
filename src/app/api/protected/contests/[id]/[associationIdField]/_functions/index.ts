import { ContestGenre, ContestParam, ContestSocial, ContestSponsor } from "@/database/models"
import { IContestAssociationIdFieldnames as IContestAssociationIdFieldNames } from "@/types/associations"

import { Model, ModelStatic } from "sequelize"

const associationModelByIdField : { [key in IContestAssociationIdFieldNames]:  ModelStatic<Model<any, any>> } = {
    ParamId: ContestParam,
    GenreId: ContestGenre,
    SocialMediumId: ContestSocial,
    SponsorId: ContestSponsor
} 

const getAssociationTableModelByIdField = (idField: IContestAssociationIdFieldNames) => associationModelByIdField[idField]

export const createContestAssociation = async ({ 
    id,
    idField,
    formData
} : {
    id: string,
    idField: IContestAssociationIdFieldNames,
    formData: FormData
}) => {
    
    const associatedItemId = formData.get('associatedItemId') as string
    
    const AssociationTable = getAssociationTableModelByIdField(idField)

    const payload = { ContestId: id, [idField]: associatedItemId } // i. e. ParamId, GenreId, SponsorId

    try {
        return await AssociationTable.create({ ...payload }).then(data => data)
    }
    catch (error) {
        throw new Error('Fallo asociando el elemento.')
    }
}

export const deleteContestAssociation = async ({ 
    id,
    idField,
    formData
} : {
    id: string,
    idField: IContestAssociationIdFieldNames,
    formData: FormData
}) => {
    
    const associatedItemId = formData.get('associatedItemId') as string
    
    const AssociationTable = getAssociationTableModelByIdField(idField)

    const payload = { ContestId: id, [idField]: associatedItemId } // i. e. ParamId, GenreId, SponsorId

    try {
        return await AssociationTable.destroy({ where: { payload } }).then(data => data)
    }
    catch (error) {
        throw new Error('Error disociando.')
    }
}

