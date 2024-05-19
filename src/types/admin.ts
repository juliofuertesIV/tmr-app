import { IBrand, IContest, IContestState, IGenre, IParam, ISocialMedia } from "."

export type IAdminData = {
    contests: IContest[],
    brands: IBrand[],
    params: IParam[],
    states: IContestState[],
    genres: IGenre[],
    social: ISocialMedia[]
}