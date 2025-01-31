export type IContestMediaRole = 'frame' | 'banner' | 'logo' | 'favicon' 
export type ICollectionsWithMediaNames = 'contests'
export type ICollectionsWithMediumNames = 'inscriptions' | 'sponsors' | 'managers'

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
    alt: string,
    width: string,
    height: string,
    role: IMediaRole
    folder: string
    filename: string,
    src: string,
}
