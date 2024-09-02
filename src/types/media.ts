export type IContestMediaRole = 'frame' | 'banner' | 'logo' | 'favicon' | 'footerElement'

export type ICollectionsWithMediaNames = 'contests' | 'inscriptions' | 'sponsors'

export type IMediaRole = IContestMediaRole | 'inscriptions' | 'sponsors'

export type IMediaPayload = {
    file: File,
    width: string,
    height: string,
    role: IMediaRole,
    domain: string
}

export type IMedia = {
    id: string,
    role: IMediaRole
    src: string,
    width: string,
    height: string,
    alt: string
}
