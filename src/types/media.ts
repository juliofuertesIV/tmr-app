export type IContestMediaRole = 'frame' | 'banner' | 'logo' | 'favicon' | 'footerElement'

export type IMediaRole = IContestMediaRole | 'inscriptions'

export type IMediaPayload = {
    file: File,
    type: 'image' | 'pdf',
    width: string,
    height: string,
    role: IMediaRole
}

export type IMedia = {
    id: string,
    role: IMediaRole
    src: string,
    width: string,
    height: string,
    alt: string
}