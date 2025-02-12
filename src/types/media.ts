import { CollectionNames, Manager, Sponsor } from "."
import { Contest } from "./contests"
import { Inscription } from "./inscriptions"

export type IContestMediaRole = 'frame' | 'banner' | 'logo' | 'favicon' 

export type ICollectionsWithMediumNames = 'inscriptions' | 'sponsors' | 'managers' | 'contests'

export type CollectionsWithMedium = Inscription & Manager & Sponsor & Contest

export type MediaRole = IContestMediaRole | 'inscriptions' | 'sponsors' | 'profile'

export type MediaPayload = {
    file: File,
    width: string,
    height: string,
    role: MediaRole,
    collection: CollectionNames & 'contests' & 'inscriptions'
    domain: string
}

export type Media = {
    id: string,
    alt: string,
    width: string,
    height: string,
    role: MediaRole
    folder: string
    filename: string,
    src: string,
}
