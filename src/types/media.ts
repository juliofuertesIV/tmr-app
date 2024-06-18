export type IContestMediaRole = 'frame' | 'banner' | 'logo' | 'favicon' | 'footerElement' | 'conditions'

export type ICollectionsWithMediaNames = 'contests' | 'inscriptions'

export type IMediaRole = IContestMediaRole | 'inscriptions'

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

export type IDocument = {
    id: string,
    role: IMediaRole
    src: string
}