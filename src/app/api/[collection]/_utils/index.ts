import ContestStates from "@/app/admin/_collections/forms/contests/ContestStates";
import { Brand, Contest, Media, Genre, Param, State, ContestParam, ContestMedia, ContestGenre, ContestSocial, SocialMedia } from "@/database";
import { IAssociationTypes, IOneOfCollectionNames } from "@/interfaces";
import { Model, ModelStatic, Options } from "sequelize";

const modelsByCollectionName = {
    contests: {
        Model: Contest,
        options: {
            include: [
                State, 
                Genre,
                Brand, 
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
    }
} as { 
    [key in IOneOfCollectionNames]: { 
        Model: ModelStatic<Model<any, any>>,
        options: Options 
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
        associationIdField: 'SocialMediaId'
    }
}

export const getModelByCollectionName = (collection: IOneOfCollectionNames) => modelsByCollectionName[collection]

export const getAssociationModelByName = (association: IAssociationTypes) => associationByName[association]