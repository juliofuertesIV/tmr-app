import { Brand, Genre, Inscription, Param, SocialMedia, Sponsor } from "."
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
    Banner: IMedia,
    Logo: IMedia,
    Frame: IMedia,
    Favicon: IMedia,
    Brand: Brand,
    State: IContestState,
    Genres: Genre[],
    Inscriptions: Inscription[],
    SocialMedia: SocialMedia[],
    Params: Param[],
    Sponsors: Sponsor[],
    createdAt: string,
    updatedAt: string
}

export type IContestState = {
    name: string, 
    id: IContestStateIds,
    description: string
}

export type IContestAssociations = Param | Genre | SocialMedia 
export type IContestAssociationNames = 'params' | 'genres' | 'social' 
export type IContestAssociationKeys = 'Params' | 'Genres' | 'SocialMedia' 
export type IContestAssociationIdFieldNames = 'ParamId' | 'GenreId' | 'SocialMediumId'

export type IContestRelationship = Brand | IContestState 
export type IContestRelationshipNames = 'brands' | 'states' 
export type IContestRelationshipKeys = 'Brand' | 'State'  
export type IContestRelationshipIdFields = 'BrandId' | 'StateId'

export type IContestMediaFieldNames = 'LogoId' | 'FrameId' | 'BannerId' | 'FaviconId'