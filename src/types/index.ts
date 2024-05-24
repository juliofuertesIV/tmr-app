
export type IOneOfCollections = IContest & IBrand & ISocialMedia

export type IOneOfCollectionNames = 'contests' | 'brands' | 'social' | 'genres' | 'inscriptions' | 'managers' | 'logs'

export type IOneOfCollectionsWithMediaNames = 'contests'

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
    token: string,
    tokenExpirationDate: string,
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
    Media: IContestMedia[],
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

export type IContestMedia = {
    id: string,
    role: IContestMediaRole
    src: string,
    width: string,
    height: string,
    alt: string
}

export type ILogTypes = 'error' | 'login'

export type ILog = {
    id?: string,
    type: string,
    message: string,
    errorCause?: string,
    digest?: number,
    route: string,
    collection?: IOneOfCollectionNames
}

export type IInscription = {
/*

    id: string,
    name: string,
    year: number,
    image: string,
    city: string,
    genre: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    instagram: {
        type: DataTypes.STRING,
    },
    video: {
        type: DataTypes.STRING
    },
    facebook: {
        type: DataTypes.STRING
    },
    spotify: {
        type: DataTypes.STRING
    },
    tiktok: {
        type: DataTypes.STRING
    },
    twitter: {
        type: DataTypes.STRING
    },
    contactEmail: {
        type:DataTypes.STRING,
        allowNull: false
    },
    contactPhone: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    contactName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    discarded: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    previousPosition: {
        type: DataTypes.INTEGER
    },
    }, {
        paranoid: true,
        indexes: [
            { 
                fields: ['instagram', 'video', 'ContestId', 'year'],
                unique: true 
            }
        ]

*/
}

export type IContestParamIds = 'inscriptionIsPublic' | 'videoIsRequired' | 'cityIsRequired' | 'instagramIsRequired' | 'hasManyItems' | 'hasGenres' | 'hasRanking'

export type IContestStateIds = 'inscriptionOnly' | 'open' | 'endedInscription' | 'ended' | 'hidden'

export type IContestMediaRole = 'frame' | 'banner' | 'logo' | 'favicon' | 'footerElement'