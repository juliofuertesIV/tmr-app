import { IBrand, IContest, IContestState, IGenre, IParam } from "."

export type IAdminData = {
    contests: IContest[],
    brands: IBrand[],
    params: IParam[],
    states: IContestState[],
    genres: IGenre[]
}