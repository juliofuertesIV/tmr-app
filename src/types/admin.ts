import { IBrand, IContest } from "."

export type IDashboardData = {
    contests: IContest[],
    brands: IBrand[],
    inscriptions: any[]
}