import { IMedia } from "./media"

export type IOneOfCollections = IContest & IBrand & ISocialMedia & IGenre & IInscription & IManager

export type IOneOfCollectionNames = 'contests' | 'brands' | 'social' | 'genres' | 'inscriptions' | 'managers'

export type IOneOfCollectionsWithMediaNames = 'contests' | 'inscriptions'

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
    createdAt: string,
    updatedAt: string
}

export type IContest = {
    id: string | number,
    name: string,
    domain: string,
    year: number | string,
    bannerHref: string | null,
    metaUrl: string | null,
    metaTitle: string | null,
    metaDescription: string | null,
    postmarkToken: string | null,
    postmarkSenderAddress: string | null,
    googleAnalyticsId: string | null,
    googleTagManagerId: string | null,
    metaPixelId: string | null,
    StateId: string,
    BrandId: number,
    Brand: IBrand,
    State: IContestState,
    Genres: IGenre[],
    SocialMedia: ISocialMedia[],
    Params: IParam[],
    Media: IMedia[],
    createdAt: string,
    updatedAt: string
}

export type IBrand = {
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

export type IParam = {
    id: IContestParamIds,
    name: string,
    description?: string
}

export type IContestState = {
    name: string, 
    id: IContestStateIds,
    description: string
}

export type IGenre = {
    id: string,
    name: string
}

export type ISocialMedia = {
    id: string,
    name: string,
    icon: string,
    createdAt: string,
    updatedAt: string
}

export type ILogTypes = 'error' | 'login'

export type ILog = {
    id?: string,
    type: string,
    message: string,
    errorCause?: string,
    digest?: number,
    route: string,
    collection?: IOneOfCollectionNames,
    createdAt: Date,
}

export type IInscription = {
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
    twitter?: string
    Medium: IMedia,
    Contest: IContest,
}

export type IContestParamIds = 'inscriptionIsPublic' | 'videoIsRequired' | 'cityIsRequired' | 'instagramIsRequired' | 'hasManyItems' | 'hasGenres' | 'hasRanking'

export type IContestStateIds = 'inscriptionOnly' | 'open' | 'endedInscription' | 'ended' | 'hidden'
