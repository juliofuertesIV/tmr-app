import { Brand, IContest } from "."

export type IDashboardData = {
    contests: IContest[],
    brands: Brand[],
    inscriptions: any[]
}