import { FooterSponsor, InscriptionTag, Sponsor, Tag } from "@/database/models"
import { AssociationIdFieldnames, AssociationNames } from "@/types/associations"

import { Model, ModelStatic } from "sequelize"

export const getAssociationModelByName = (association: AssociationNames) => {
    
    const associationModelByIdField : { [key in AssociationNames]: ModelStatic<Model<any, any>> } = {
        sponsors: Sponsor,
        tags: Tag
    } 

    return associationModelByIdField[association]
} 

export const getAssociationTableAndFieldByName = (association: AssociationNames) => {
    
    const associationTableByIdField : { 
        [key in AssociationNames]: { 
            AssociationTable: ModelStatic<Model<any, any>>, 
            collectionItemIdField: string,
            associationIdField: AssociationIdFieldnames
        } 
    } = {
        sponsors: { 
            AssociationTable: FooterSponsor,
            collectionItemIdField: 'FooterId',
            associationIdField: 'SponsorId' 
        },
        tags: { 
            AssociationTable: InscriptionTag, 
            collectionItemIdField: 'InscriptionId',
            associationIdField: 'TagId' 
        }
    } 

    return associationTableByIdField[association]
}


export const createCollectionAssociation = async ({ id, association, formData } : { id: string, association: AssociationNames, formData: FormData }) => {
    
    const associationId = formData.get('associationId') as string

    if (!associationId) 
        throw new Error('No associationId field in formData')

    const { 
        AssociationTable,
        collectionItemIdField,
        associationIdField 
    } = getAssociationTableAndFieldByName(association)

    if (!collectionItemIdField || !AssociationTable) 
        throw new Error('Bad request. Cannot find collectionItemIdField or Association Table.')

    const payload = { [collectionItemIdField]: id, [associationIdField]: associationId } // i. e. FooterId, SponsorId

    
    return await AssociationTable.create({ ...payload })
    .then(data => data)
    .catch(error => { throw new Error(error as string )})
}
