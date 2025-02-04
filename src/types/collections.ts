import { IContest, IContestParamIds, IManager } from "."
import { IMedia } from "./media"

export type IAllCollections = IBrand & ISocialMedia & IGenre & ISponsor & ITag & ITagType

export type ICollectionNames = 'brands' | 'social' | 'genres' | 'sponsors' | 'tags' | 'tagTypes'


export type ITag = {
    id: string,
    name: string,
    TagTypeId: string,
    TagTypes: ITagType
}

export type ITagType = {
    id: string,
    name: string,
    Tags: ITag
}

export type IFooter = {
    id: string,
    name: string,
    ContestId: string
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

export type IInscription = {
    id: string,
    name: string,
    year: number,
    image: string,
    city: string,
    description: string,
    email: string,
    phone: string,
    contactName: string,
    verified: boolean,
    discarded: boolean,
    previousPosition: number,
    genre?: string,
    instagram?: string,
    video?: string,
    facebook?: string,
    spotify?: string,
    tiktok?: string,
    twitter?: string,
    MediumId: string,
    Medium: IMedia,
    Contest: IContest,
}

export type ISponsor = {
    id: string,
    name: string,
    Media: IMedia[],
    MediumId: string
}
