import { ITagType } from "./collections"
import { IContest } from "./contests"
import { IMedia } from "./media"

export type AllCollections = Brand & SocialMedia & Genre & Manager & ITagType & IContest & Inscription

export type CollectionNames = 'brands' | 'social' | 'genres' | 'managers' | 'sponsors' | 'tagtypes' | 'tags'

export type CollectionsWithMedium = Inscription & Manager & Sponsor & IContest

export type ManagerRoleId = 1 | 2 | 3 | 4

export type ManagerRole = {
    id: ManagerRoleId,
    name: string
}

export type DecryptedJWTManager = {
    id: string,
    name: string,
    email: string,
    RoleId: ManagerRoleId
}

export type Manager = {
    id: string,
    name: string,
    email: string,
    hash: string,
    salt: string,
    emailVerified: boolean,
    Contests: IContest[],
    RoleId: ManagerRoleId,
    Role: ManagerRole,
    MediumId: string,
    Medium: IMedia,
    createdAt: string,
    updatedAt: string
}

export type Brand = {
    id: string | number,
    name: string,
    backgroundColor: string,
    foregroundColor: string,
    accentColor: string,
    instagramProfile: string,
    tiktokProfile?: string,
    website: string,
    createdAt: string,
    updatedAt: string
}

export type Param = {
    id: ContestParamIds,
    name: string,
    description?: string
}

export type ContestState = {
    name: string, 
    id: ContestStateIds,
    description: string
}

export type Genre = {
    id: string,
    name: string
}

export type SocialMedia = {
    id: string,
    name: string,
    icon: string,
    createdAt: string,
    updatedAt: string
}

export type LogTypes = 'error' | 'login'

export type Log = {
    id?: string,
    type: string,
    message: string,
    errorCause?: string,
    digest?: number,
    route: string,
    collection?: CollectionNames,
    Manager?: Manager,
    createdAt: Date,
}

export type Inscription = {
    id: string,
    name: string,
    year: number,
    image: string,
    city: string,
    description: string,
    email: string,
    phone: string,
    contactName: string,
    verified: boolean,
    discarded: boolean,
    previousPosition: number,
    genre?: string,
    instagram?: string,
    video?: string,
    facebook?: string,
    spotify?: string,
    tiktok?: string,
    twitter?: string,
    MediumId: string,
    Medium: IMedia,
    ContestId: string,
    Contest: IContest,
}

export type Sponsor = {
    id: string,
    name: string,
    Media: IMedia[],
    MediumId: string
}

export type ContestParamIds = 'inscriptionIsPublic' | 'videoIsRequired' | 'cityIsRequired' | 'instagramIsRequired' | 'hasManyItems' | 'hasGenres' | 'hasRanking'

export type ContestStateIds = 'inscriptionOnly' | 'open' | 'endedInscription' | 'ended' | 'hidden'
