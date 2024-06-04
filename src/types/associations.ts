import { IBrand, IContest, IContestState, IGenre, IParam, ISocialMedia } from "."

export type IOneOfCollectionsWithAssociations = IContest | IBrand

export type IOneOfAssociations = IBrand | IParam | IContestState | IGenre | ISocialMedia

export type IOneOfCollectionsNamesWithAssociations = 'contests' | 'users'

export type IAssociationNames = 'params' | 'genres' | 'social' | 'media' | 'managers'

export type IManyToManyAssociationKeys = IManyToManyContestKeys | 'Roles'

export type IManyToManyContestKeys = 'Params' | 'Genres' | 'SocialMedia'

export type ISimpleAssociationKeys = 'StateId' | 'BrandId'