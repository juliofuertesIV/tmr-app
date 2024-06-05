import { Brand, Contest, Media, Genre, Param, State, ContestParam, ContestMedia, ContestGenre, ContestSocial, SocialMedia, Manager, Role, Log, Inscription } from "@/lib/database";
import { ICollectionNames } from "@/types";
import { IAssociationIdFieldnames, IAssociationKeys, IAssociationNames, IRelationshipIdFieldnames, IRelationshipNames } from "@/types/associations";
import { ICollectionsWithMediaNames } from "@/types/media";
import { FindOptions, Model, ModelStatic } from "sequelize";

const modelsByCollectionName = {
    contests: {
        Model: Contest,
        options: {
            include: [
                State, 
                Genre,
                Brand,
                SocialMedia,
                { 
                    model: Param,
                    attributes: ['id', 'name', 'description'],
                    through: { 
                        attributes: [] }
                }, {
                    model: Media,
                    attributes: ['id', 'src', 'role', 'width', 'height', 'alt'],
                    through: {
                        attributes: [],
                    }
                }
                
            ]
        } 
    },
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
            include: [ Role ]
        }
    },
    inscriptions: {
        Model: Inscription,
        options: {
            include: [ Media ]
        }
    },
    logs: {
        Model: Log,
        options: {
            order: [['createdAt', 'DESC']]
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
        collectionItemIdField: 'ContestId',
        associationIdField: 'ParamId'
    },
    genres: {
        AssociationTable: ContestGenre,
        AssociationModel: Genre,
        associationKey: 'Genres',
        collectionItemIdField: 'ContestId',
        associationIdField: 'GenreId'
    },
    social: {
        AssociationTable: ContestSocial,
        AssociationModel: SocialMedia,
        associationKey: 'SocialMedia',
        collectionItemIdField: 'ContestId',
        associationIdField: 'SocialMediumId'
    },
} as {
    [key in IAssociationNames]: {
        AssociationTable: ModelStatic<Model<any, any>> | null,
        AssociationModel: ModelStatic<Model<any, any>>,
        associationKey: IAssociationKeys,
        collectionItemIdField: string | null,
        associationIdField: IAssociationIdFieldnames
    }
}

const relationshipByName = {
    brand: {
        RelationshipModel: Brand,
        relationshipIdFieldName: 'BrandId'
    },
    state: {
        RelationshipModel: State,
        relationshipIdFieldName: 'StateId'
    }
} as {
    [key in IRelationshipNames]: {
        RelationshipModel: ModelStatic<Model<any, any>>,
        relationshipIdFieldName: IRelationshipIdFieldnames
    }
}

export const collectionHasMedia = (
    collection: ICollectionNames | ICollectionsWithMediaNames
) : collection is ICollectionsWithMediaNames => collection === 'contests' || collection === 'inscriptions'

export const collectionCreationIncludesMedia = (
    collection: ICollectionNames | ICollectionsWithMediaNames
) : collection is ICollectionsWithMediaNames => collection === 'inscriptions'

export const getModelByCollectionName = (collection: ICollectionNames) => modelsByCollectionName[collection]

export const getAssociationModelByName = (association: IAssociationNames) => associationByName[association]

export const getRelationshipModelByName = (relationship: IRelationshipNames) => relationshipByName[relationship]