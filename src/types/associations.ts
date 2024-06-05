import { IBrand, IContest, IContestState, IGenre, IManager, IManagerRole, IParam, ISocialMedia } from "."
import { IMedia } from "./media"

export type ICollectionsWithAssociations = IContest | IManager

export type IAssociations = IParam | IGenre | ISocialMedia | IManagerRole

export type IRelationships = IBrand | IContestState

export type IRelationshipNames = 'brand' | 'state' 

export type IAssociationNames = 'params' | 'genres' | 'social' 

export type IAssociationKeys = 'Params' | 'Genres' | 'SocialMedia'

export type IAssociationIdFieldnames = 'ParamId' | 'GenreId' | 'SocialMediumId'

export type IRelationshipIdFieldnames = 'BrandId' | 'StateId'
