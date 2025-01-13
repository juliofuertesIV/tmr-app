export type IContestMediaRole = 'frame' | 'banner' | 'logo' | 'favicon' | 'footerElement' 

export type ICollectionsWithMediaNames = 'contests' | 'inscriptions' | 'sponsors' | 'managers'

export type IMediaRole = IContestMediaRole | 'inscriptions' | 'sponsors' | 'profilePic'

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
