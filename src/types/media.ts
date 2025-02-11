import { IContest, Inscription, Manager, Sponsor } from "."
import { IFooter } from "./collections"

export type IContestMediaRole = 'frame' | 'banner' | 'logo' | 'favicon' 

export type ICollectionsWithMediaNames = 'footers'

export type ICollectionsWithMediumNames = 'inscriptions' | 'sponsors' | 'managers' | 'contests'

export type ICollectionsWithMedia = IFooter

export type ICollectionsWithMedium = Inscription & Manager & Sponsor & IContest

export type IMediaRole = IContestMediaRole | 'inscriptions' | 'sponsors' | 'profile'

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
