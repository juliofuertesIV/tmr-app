export type IContestStateIds = 'inscriptionOnly' | 'open' | 'endedInscription' | 'ended' | 'hidden'
export type IContestParamIds = 'inscriptionIsPublic' | 'videoIsRequired' | 'cityIsRequired' | 'instagramIsRequired' | 'hasManyItems' | 'hasGenres' | 'hasRanking'

export type IOneOfCollections = IContest & IBrand

export type IOneOfCollectionNames = 'contests' | 'brands'

export type IOneOfCollectionsWithAssociations = IContest | IBrand

export type IOneOfAssociations = IBrand | IParam | IContestState | IGenre | ISocialMedia

export type IOneOfCollectionsNamesWithAssociations = 'contests' | 'users'

export type IContestState = {
    name: string, 
    id: IContestStateIds,
    description: string
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
    Media: IContestMedia[]
}

export type IAssociationTypes = 'params' | 'states' | 'brands' | 'genres' | 'social'

export type IManyToManyAssociationKeys = IManyToManyContestKeys | 'Roles'

export type IManyToManyContestKeys = 'Params' | 'Genres' | 'SocialMedia'

export type ISimpleAssociationKeys = 'StateId' | 'BrandId'

export type IBrand = {
    id: string | number,
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

export type IGenre = {
    id: string,
    name: string
}

export type ISocialMedia = {
    id: string,
    name: string,
    icon: string
}

export type IContestMediaRole = 'frame' | 'banner' | 'logo' | 'favicon' | 'footerElement'

export type IContestMedia = {
    id: string,
    role: IContestMediaRole
    src: string,
    width: string,
    height: string,
    alt: string
}