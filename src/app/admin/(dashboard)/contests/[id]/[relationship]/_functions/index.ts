import { Brand, Contest, State } from "@/database/models"
import { IContestRelationshipIdFields, IContestRelationshipNames } from "@/types/contests"
import { FindOptions, Model, ModelStatic } from "sequelize"

const relationshipByName : { // TO DO: SCOPES?
    [key in IContestRelationshipNames]: {
        RelationshipModel: ModelStatic<Model<any, any>>,
        relationshipIdFieldName: IContestRelationshipIdFields,
        options: FindOptions
    }
} = {
    brands: {
        RelationshipModel: Brand,
        relationshipIdFieldName: 'BrandId',
        options: {
            order: [[ 'name', 'ASC' ]]
        }
    },
    states: {
        RelationshipModel: State,
        relationshipIdFieldName: 'StateId',
        options: {
            order: [[ 'name', 'ASC' ]]
        }
    }
}

export const getContestRelationshipModelByName = (relationship: IContestRelationshipNames) => relationshipByName[relationship]


export const getContestRelationshipPageData = async ({ id, relationship } : { id: string, relationship: IContestRelationshipNames }) => {

    const { 
        RelationshipModel,
        options: relationshipOptions,
        relationshipIdFieldName 
    } = getContestRelationshipModelByName(relationship)
    
    const contest = await Contest.findOne({ where: { id }, include: [RelationshipModel] }).then(data => data)
    const relationshipItems = await RelationshipModel.findAll({ ...relationshipOptions }).then(data => data)

    return { 
        contest: JSON.parse(JSON.stringify(contest)), 
        relationshipItems: JSON.parse(JSON.stringify(relationshipItems)),
        relationshipIdFieldName
    }
}
