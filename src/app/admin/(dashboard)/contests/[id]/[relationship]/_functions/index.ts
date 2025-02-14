import { Brand, Contest, Footer, State } from "@/database/models"
import { Contest as ContestType, ContestRelationship, ContestRelationshipIdFields, ContestRelationshipNames } from "@/types/contests"
import { FindOptions, Model, ModelStatic } from "sequelize"
import ContestRelationshipManager from "../_components/ContestRelationshipManager"
import ContestFooterManager from "../_components/ContestFooterManager"

type ContestRelationshipManager = ({ contest, relationshipItems, relationshipIdField }: { contest: ContestType; relationshipItems: ContestRelationship[]; relationshipIdField: ContestRelationshipIdFields; }) => JSX.Element
type ContestFooterManager = ({ contest } : { contest: ContestType }) => JSX.Element
type RelationshipManager = ContestRelationshipManager | ContestFooterManager

const relationshipByName : { // TO DO: SCOPES?
    [key in ContestRelationshipNames]: {
        RelationshipModel: ModelStatic<Model<any, any>>,
        relationshipIdFieldName: ContestRelationshipIdFields,
        options: FindOptions,
        manager: RelationshipManager
    }
} = {
    brands: {
        RelationshipModel: Brand,
        relationshipIdFieldName: 'BrandId',
        options: {
            order: [[ 'name', 'ASC' ]]
        },
        manager: ContestRelationshipManager
    },
    states: {
        RelationshipModel: State,
        relationshipIdFieldName: 'StateId',
        options: {
            order: [[ 'name', 'ASC' ]]
        },
        manager: ContestRelationshipManager
    },
    footers: {
        RelationshipModel: Footer,
        relationshipIdFieldName: 'FooterId',
        options: {
            order: [[ 'name', 'ASC' ]]
        },
        manager: ContestFooterManager
    }
}

export const getContestRelationshipModelByName = (relationship: ContestRelationshipNames) => relationshipByName[relationship]

export const getContestRelationshipPageData = async ({ id, relationship } : { id: string, relationship: ContestRelationshipNames }) => {

    const { 
        RelationshipModel,
        options: relationshipOptions,
        relationshipIdFieldName,
        manager 
    } = getContestRelationshipModelByName(relationship)
    
    const contest = await Contest.scope('detailed').findOne({ where: { id }, include: [RelationshipModel] }).then(data => data)
    const relationshipItems = await RelationshipModel.findAll({ ...relationshipOptions }).then(data => data)

    return { 
        contest: JSON.parse(JSON.stringify(contest)), 
        relationshipItems: JSON.parse(JSON.stringify(relationshipItems)),
        relationshipIdFieldName,
        Manager: manager
    }
}