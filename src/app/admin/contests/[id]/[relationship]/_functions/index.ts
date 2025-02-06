import { Brand, State } from "@/database/models"
import { IContestRelationshipIdFields, IContestRelationshipNames } from "@/types/contests"
import { FindOptions, Model, ModelStatic } from "sequelize"

const relationshipByName : {
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