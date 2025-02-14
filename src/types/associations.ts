import { Sponsor } from "."
import { Footer, Tag } from "./collections"
import { Inscription } from "./inscriptions"

export type CollectionsWithAssociations = Footer & Inscription
export type CollectionsWithAssociationNames = 'footers' | 'inscriptions'
export type Association = Sponsor & Tag
export type AssociationNames = 'sponsors' | 'tags'
export type AssociationIdFieldnames = 'SponsorId' | 'TagId'
export type AssociationKeys = 'Sponsors' | 'Tags'
