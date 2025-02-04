import { IBrand, IGenre, IInscription, IParam, ISocialMedia, ISponsor } from "."
import { IMedia } from "./media"


export type IContestParamIds = 'inscriptionIsPublic' | 'videoIsRequired' | 'cityIsRequired' | 'instagramIsRequired' | 'hasManyItems' | 'hasGenres' | 'hasRanking'

export type IContestStateIds = 'inscriptionOnly' | 'open' | 'endedInscription' | 'ended' | 'hidden'


export type IContest = {
    id: string,
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
    termsAndConditions: string,
    StateId: IContestStateIds,
    BrandId: number,
    BannerId: string,
    FrameId: string,
    LogoId: string,
    FaviconId: string,
    Brand: IBrand,
    State: IContestState,
    Genres: IGenre[],
    Inscriptions: IInscription[],
    SocialMedia: ISocialMedia[],
    Params: IParam[],
    Media: IMedia[],
    Sponsors: ISponsor[],
    createdAt: string,
    updatedAt: string
}


export type IContestState = {
    name: string, 
    id: IContestStateIds,
    description: string
}
