import { IContest, IGenre, IManager, IManagerRole, IParam, ISocialMedia } from "."
import { IMedia } from "./media"

export type ICollectionsWithAssociations = IContest | IManager

export type IAssociations = IParam | IGenre | ISocialMedia | IManagerRole | IMedia

export type IAssociationNames = 'params' | 'genres' | 'social' | 'media' 

export type IAssociationKeys = 'Params' | 'Genres' | 'SocialMedia' | 'Media'
