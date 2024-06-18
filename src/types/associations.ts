import { IBrand, IContest, IContestState, IGenre, IManager, IManagerRole, IParam, ISocialMedia } from "."

export type ICollectionsWithAssociations = IContest | IManager

export type IAssociation = IParam | IGenre | ISocialMedia | IManagerRole

export type IRelationship = IBrand | IContestState

export type IRelationshipNames = 'brand' | 'state' 

export type IAssociationNames = 'params' | 'genres' | 'social' | 'media'

export type IAssociationKeys = 'Params' | 'Genres' | 'SocialMedia' | 'Media'

export type IAssociationIdFieldnames = 'ParamId' | 'GenreId' | 'SocialMediumId' | 'MediumId'

export type IRelationshipIdFieldnames = 'BrandId' | 'StateId'
