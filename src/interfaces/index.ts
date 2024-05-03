export type IContestStateIds = 'inscriptionOnly' | 'open' | 'endedInscription' | 'ended' | 'hidden'
export type IContestParamIds = 'inscriptionIsPublic' | 'videoIsRequired' | 'cityIsRequired' | 'instagramIsRequired' | 'hasManyItems' | 'hasGenres' | 'hasRanking'

export type IOneOfCollections = IContest & IBrand

export type IOneOfCollectionNames = 'contests' | 'brands'

export type IContestState = {
    name: string, 
    id: IContestStateIds,
    description: string
}

export type IContest = {
    id?: string | number,
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
    Params: IParam[],
    Media: IContestMedia[]
}

export type IBrand = {
    id?: string | number,
    name: string,
    backgroundColor: string,
    foregroundColor: string,
    accentColor: string,
    profile: string,
    website: string
}

export type IParam = {
    id: IContestParamIds,
    name: string,
    description?: string
}

export type IContestMediaRole = 'footerElement' | 'banner' | 'logo' | 'favicon'

export type IContestMedia = {
    id: string,
    role: 'footerElement' | 'banner' | 'logo' | 'favicon',
    src: string,
    width: string,
    height: string,
    alt: string
}