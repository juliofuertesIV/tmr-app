import { IContestParamIds } from "."
import { IMedia } from "./media"

export type IAllCollections = IBrand & ISocialMedia & IGenre & ISponsor & ITag & ITagType

export type ICollectionNames = 'brands' | 'social' | 'genres' | 'sponsors' | 'tags' | 'tagTypes'

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

export type IFooter = {
    id: string,
    name: string,
    ContestId: string
}

export type IGenre = {
    id: string,
    name: string
}

export type IParam = {
    id: IContestParamIds,
    name: string,
    description?: string
}

export type ISocialMedia = {
    id: string,
    name: string,
    icon: string,
    createdAt: string,
    updatedAt: string
}

export type ISponsor = {
    id: string,
    name: string,
    Media: IMedia[],
    MediumId: string
}

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
