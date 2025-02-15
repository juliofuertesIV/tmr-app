import { IContest } from "."
import { Media } from "./media"

export type IManagerRoleId = 1 | 2 | 3 | 4

export type IManagerRole = {
    id: IManagerRoleId,
    name: string
}


export type IManager = {
    id: string,
    name: string,
    email: string,
    hash: string,
    salt: string,
    emailVerified: boolean,
    Contests: IContest[],
    RoleId: IManagerRoleId,
    Role: IManagerRole,
    MediumId: string,
    Medium: Media,
    createdAt: string,
    updatedAt: string
}