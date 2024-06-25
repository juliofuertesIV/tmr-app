import { IBrand, IContest, IContestState, IGenre, IManager, IManagerRole, IParam, ISocialMedia, ISponsor } from "."
import { IMedia } from "./media"

export type ICollectionsWithAssociations = IContest | IManager | ISponsor

export type IAssociation = IParam | IGenre | ISocialMedia | IManagerRole | ISponsor | IMedia

export type IRelationship = IBrand | IContestState | IMedia

export type IRelationshipNames = 'brand' | 'state' | 'media'

export type IAssociationNames = 'params' | 'genres' | 'social' | 'media'

export type IAssociationKeys = 'Params' | 'Genres' | 'SocialMedia' | 'Media'

export type IAssociationIdFieldnames = 'ParamId' | 'GenreId' | 'SocialMediumId' | 'MediumId'

export type IRelationshipIdFieldnames = 'BrandId' | 'StateId' | 'MediumId'
