import { IBrand, IContest } from "."

export type IAdminData = {
    contests: IContest[],
    brands: IBrand[],
    inscriptions: any[]
}