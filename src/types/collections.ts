import { ContestParamIds } from "."
import { Media } from "./media"

export type AllCollectionItems = Brand & SocialMedia & Sponsor & Tag & TagCategory

export type CollectionNames = 'brands' | 'social' | 'sponsors' | 'tags' | 'tagTypes'

export type Brand = {
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

export type Footer = {
    id: string,
    name: string,
    ContestId: string,
    Sponsors: Sponsor[]
}

export type Param = {
    id: ContestParamIds,
    name: string,
    description?: string
}

export type SocialMedia = {
    id: string,
    name: string,
    icon: string,
    createdAt: string,
    updatedAt: string
}

export type Sponsor = {
    id: string,
    name: string,
    Media: Media[],
    MediumId: string
}

export type Tag = {
    id: string,
    name: string,
    TagCategoryId: string,
    TagCategories: TagCategory
}

export type TagCategory = {
    id: string,
    name: string,
    Tags: Tag[]
}
