import { Brand, Contest, Media, Genre, Param, State, ContestParam, ContestGenre, ContestSocial, SocialMedia, Manager, Role, Log, Inscription, ContestMedia, Sponsor, ContestSponsor, ContestDocument, Document } from "@/lib/database";
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
                },
                Document,
                Sponsor
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
    },
    sponsors: {
        Model: Sponsor,
        options: {
            include: [ Media ],
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
        collectionItemIdField: 'ContestId',
        associationIdField: 'ParamId',
        options: {
            order: [['name', 'DESC']]
        }
    },
    genres: {
        AssociationTable: ContestGenre,
        AssociationModel: Genre,
        associationKey: 'Genres',
        collectionItemIdField: 'ContestId',
        associationIdField: 'GenreId',
        options: {
            order: [['name', 'DESC']]
        }
    },
    social: {
        AssociationTable: ContestSocial,
        AssociationModel: SocialMedia,
        associationKey: 'SocialMedia',
        collectionItemIdField: 'ContestId',
        associationIdField: 'SocialMediumId',
        options: {
            order: [['name', 'DESC']]
        }
    },
    media: {
        AssociationTable: ContestMedia,
        AssociationModel: Media,
        associationKey: 'Media',
        collectionItemIdField: 'ContestId',
        associationIdField: 'MediumId',
        options: {}
    },
    sponsors: {
        AssociationTable: ContestSponsor,
        AssociationModel: Sponsor,
        associationKey: 'Sponsors',
        collectionItemIdField: 'ContestId',
        associationIdField: 'SponsorId',
        options: { include: [ Media ]}
    },
    documents: {
        AssociationTable: ContestDocument,
        AssociationModel: Document,
        associationKey: 'Documents',
        collectionItemIdField: 'ContestId',
        associationIdField: 'DocumentId',
        options: {}
    }
} as {
    [key in IAssociationNames]: {
        AssociationTable: ModelStatic<Model<any, any>> | null,
        AssociationModel: ModelStatic<Model<any, any>>,
        associationKey: IAssociationKeys,
        collectionItemIdField: string | null,
        associationIdField: IAssociationIdFieldnames,
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

export const collectionHasMedia = (
    collection: ICollectionNames | ICollectionsWithMediaNames
) : collection is ICollectionsWithMediaNames => collection === 'contests' || collection === 'inscriptions'

export const collectionCreationIncludesMedia = (
    collection: ICollectionNames | ICollectionsWithMediaNames
) : collection is ICollectionsWithMediaNames => collection === 'inscriptions'

export const getModelByCollectionName = (collection: ICollectionNames) => modelsByCollectionName[collection]

export const getAssociationModelByName = (association: IAssociationNames) => associationByName[association]

export const getRelationshipModelByName = (relationship: IRelationshipNames) => relationshipByName[relationship]