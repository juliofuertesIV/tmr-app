import { Brand, Contest, Media, Genre, Param, State, ContestParam, ContestGenre, ContestSocial, SocialMedia, Manager, Role, Log, Sponsor, Tag } from '@/database/models';
import { ICollectionNames } from "@/types";
import { IContestAssociationIdFieldNames, IContestAssociationKeys, IContestAssociationNames, IRelationshipIdFieldnames, IRelationshipNames } from "@/types/associations";
import { FindOptions, Model, ModelStatic } from "sequelize";

const modelsByCollectionName = {
   brands: {
        Model: Brand,
        options: {
            include: [ Contest ]
        }
    },
    social: {
        Model: SocialMedia,
        options: {}
    },
    genres: {
        Model: Genre,
        options: {}
    },
    managers: {
        Model: Manager,
        options: {
            include: [ Role, Media ]
        }
    },
    logs: {
        Model: Log,
        options: {
            order: [['createdAt', 'DESC']]
        }
    },
    sponsors: {
        Model: Sponsor,
        options: {
            include: [ Media ],
            order: [['name', 'ASC']]
        }
    },
    tags: {
        Model: Tag,
        options: {
            order: [['name', 'ASC']]
        }
    }
} as { 
    [key in ICollectionNames]: { 
        Model: ModelStatic<Model<any, any>>,
        options: FindOptions 
    }
}

const associationByName = {
    params: {
        AssociationTable: ContestParam,
        AssociationModel: Param,
        associationKey: 'Params',
        associationIdField: 'ParamId',
        options: {
            order: [['name', 'DESC']]
        }
    },
    genres: {
        AssociationTable: ContestGenre,
        AssociationModel: Genre,
        associationKey: 'Genres',
        associationIdField: 'GenreId',
        options: {
            order: [['name', 'DESC']]
        }
    },
    social: {
        AssociationTable: ContestSocial,
        AssociationModel: SocialMedia,
        associationKey: 'SocialMedia',
        associationIdField: 'SocialMediumId',
        options: {
            order: [['name', 'DESC']]
        }
    }
} as {
    [key in IContestAssociationNames]: {
        AssociationTable: ModelStatic<Model<any, any>>,
        AssociationModel: ModelStatic<Model<any, any>>,
        associationKey: IContestAssociationKeys,
        associationIdField: IContestAssociationIdFieldNames,
        options: FindOptions 
    }
}

const relationshipByName = {
    brand: {
        RelationshipModel: Brand,
        relationshipIdFieldName: 'BrandId',
        options: {
            order: [[ 'name', 'ASC' ]]
        }
    },
    state: {
        RelationshipModel: State,
        relationshipIdFieldName: 'StateId',
        options: {
            order: [[ 'name', 'ASC' ]]
        }
    },
    role: {
        RelationshipModel: Role,
        relationshipIdFieldName: 'RoleId',
        options: {
            order: [[ 'name', 'ASC' ]]
        }
    },
    media: {
        RelationshipModel: Media,
        relationshipIdFieldName: 'MediumId',
        options: {
            order: [[ 'role', 'ASC' ]]
        }
    }
} as {
    [key in IRelationshipNames]: {
        RelationshipModel: ModelStatic<Model<any, any>>,
        relationshipIdFieldName: IRelationshipIdFieldnames,
        options: FindOptions
    }
}

export const getModelByCollectionName = (collection: ICollectionNames) => modelsByCollectionName[collection]

export const getRelationshipModelByName = (relationship: IRelationshipNames) => relationshipByName[relationship]