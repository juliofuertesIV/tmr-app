import { Brand, Contest, Media, Genre, Param, State, ContestParam, ContestMedia, ContestGenre, ContestSocial, SocialMedia, Manager, Role, Log, Inscription } from "@/lib/database";
import { ICollectionNames, ICollectionsWithMediaNames } from "@/lib/types";
import { IAssociationNames } from "@/types/associations";
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
        collectionItemIdField: 'ContestId',
        associationIdField: 'ParamId'
    },
    media: {
        AssociationTable: ContestMedia,
        AssociationModel: Media,
        collectionItemIdField: 'ContestId',
        associationIdField: 'MediumId'
    },
    genres: {
        AssociationTable: ContestGenre,
        AssociationModel: Genre,
        collectionItemIdField: 'ContestId',
        associationIdField: 'GenreId'
    },
    social: {
        AssociationTable: ContestSocial,
        AssociationModel: SocialMedia,
        collectionItemIdField: 'ContestId',
        associationIdField: 'SocialMediumId'
    },
    managers: {
        AssociationTable: null,
        AssociationModel: Role,
        collectionItemIdField: null,
        associationIdField: 'RoleId'
    }
} as {
    [key in IAssociationNames]: {
        AssociationTable: ModelStatic<Model<any, any>> | null,
        AssociationModel: ModelStatic<Model<any, any>>,
        collectionItemIdField: string | null,
        associationIdField: string
    }
}

export const getModelByCollectionName = (collection: ICollectionNames) => modelsByCollectionName[collection]

export const getAssociationModelByName = (association: IAssociationNames) => associationByName[association]

export const collectionHasMedia = (collection: ICollectionNames) : collection is ICollectionsWithMediaNames => {
    return collection === 'contests' || collection === 'inscriptions'
}