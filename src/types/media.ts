export type IContestMediaRole = 'frame' | 'banner' | 'logo' | 'favicon' | 'footerElement'

export type ICollectionsWithMediaNames = 'contests' | 'inscriptions'

export type IMediaRole = IContestMediaRole | 'inscriptions'

export type IMediaTypes = 'image' | 'pdf'

export type IMediaPayload = {
    file: File,
    type: IMediaTypes,
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