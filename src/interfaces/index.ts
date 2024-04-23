export type IOneOfCollections = IContest & IBrand

export type IOneOfCollectionNames = 'contests' | 'brands'

export type IContestState = {
    name: string, 
    id: string,
    description: string
}

export type IContestStateNames = 'ended' | 'hidden' | 'endedInscription' | 'inscriptionOnly' | 'open'

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
    StateId: string
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