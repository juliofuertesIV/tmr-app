import { TagCategory } from "./collections"
import { Contest } from "./contests"
import { Inscription } from "./inscriptions"
import { Media } from "./media"


export type AllCollections = Brand & SocialMedia & Genre & Manager & TagCategory & Contest & Inscription
export type CollectionNames = 'brands' | 'social' | 'managers' | 'sponsors' | 'tagCategories' | 'tags' | 'footers'

export type CollectionWithMediumNames = 'inscriptions' | 'managers' | 'contests' | 'sponsors'
export type CollectionsWithMedium = Inscription & Manager & Sponsor & Contest

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
    Contests: Contest[],
    RoleId: ManagerRoleId,
    Role: ManagerRole,
    MediumId: string,
    Medium: Media,
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

export type Sponsor = {
    id: string,
    name: string,
    Media: Media[],
    MediumId: string
}

export type ContestParamIds = 'inscriptionIsPublic' | 'videoIsRequired' | 'cityIsRequired' | 'instagramIsRequired' | 'hasManyItems' | 'hasGenres' | 'hasRanking'

export type ContestStateIds = 'inscriptionOnly' | 'open' | 'endedInscription' | 'ended' | 'hidden'
