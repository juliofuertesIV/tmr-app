import { Brand, Genre, Param, SocialMedia, Sponsor } from "."
import { Footer } from "./collections"
import { Inscription } from "./inscriptions"
import { Media } from "./media"


export type ContestParamIds = 'inscriptionIsPublic' | 'videoIsRequired' | 'cityIsRequired' | 'instagramIsRequired' | 'hasManyItems' | 'hasGenres' | 'hasRanking'

export type ContestStateIds = 'inscriptionOnly' | 'open' | 'endedInscription' | 'ended' | 'hidden'

export type Contest = {
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
    StateId: ContestStateIds,
    BrandId: number,
    BannerId: string,
    FrameId: string,
    LogoId: string,
    FaviconId: string,
    Banner?: Media,
    Logo?: Media,
    Frame?: Media,
    Favicon?: Media,
    Brand?: Brand,
    Footer: Footer,
    FooterId: string,
    State?: IContestState,
    Genres?: Genre[],
    Inscriptions?: Inscription[],
    SocialMedia?: SocialMedia[],
    Params?: Param[],
    Sponsors?: Sponsor[],
    createdAt: string,
    updatedAt: string
}

export type IContestState = {
    name: string, 
    id: ContestStateIds,
    description: string
}

export type ContestAssociations = Param | SocialMedia 
export type ContestAssociationNames = 'params' | 'social' 
export type ContestAssociationKeys = 'Params' | 'SocialMedia' 
export type ContestAssociationIdFieldNames = 'ParamId' | 'SocialMediumId'

export type IContestRelationship = Brand | IContestState 
export type IContestRelationshipNames = 'brands' | 'states' 
export type IContestRelationshipKeys = 'Brand' | 'State'  
export type IContestRelationshipIdFields = 'BrandId' | 'StateId'

export type IContestMediaFieldNames = 'LogoId' | 'FrameId' | 'BannerId' | 'FaviconId'