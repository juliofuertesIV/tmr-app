import { IBrand, IContest, IContestState, IGenre, IInscription, IManager, IManagerRole, IParam, ISocialMedia, ISponsor } from "."
import { IMedia } from "./media"

// ADD TAGS

export type ICollectionsWithRelationships = IContest | IManager | ISponsor | IInscription
export type ICollectionsWithRelationshipNames = "contests" | "sponsors" | "inscriptions" | "managers"

export type ICollectionsWithAssociations = IContest | IManager | ISponsor | IInscription
export type ICollectionsWithAssociationsNames = "contests" | "sponsors" | "inscriptions" | "managers"

export type IAssociation = IParam | IGenre | ISocialMedia | IManagerRole | ISponsor | IMedia 
export type IMedialessAssociation = Exclude<IAssociation, IMedia> // TO DO: REMOVE MEDIA

export type IRelationship = IBrand | IContestState | IMedia
export type IMedialessRelationship = Exclude<IRelationship, IMedia>

export type IRelationshipNames = 'brand' | 'state' | 'media'
export type IMedialessRelationshipNames = Exclude<IRelationshipNames, 'media'>

export type IAssociationNames = 'params' | 'genres' | 'social' | 'media' | 'sponsors' // TO DO: REMOVE MEDIA
export type IMedialessAssociationNames = Exclude<IAssociationNames, 'media'>

export type IContestAssociationKeys = 'Params' | 'Genres' | 'SocialMedia' | 'Sponsors'

export type IRelationshipKeys = 'Media' | 'Genres' | 'Brands'  // TO DO: REMOVE MEDIA
export type IMedialessRelationshipKeys = Exclude<IRelationshipKeys, 'Media'>


export type IContestAssociations = IParam | IGenre | ISocialMedia | ISponsor
export type IContestAssociationNames = 'params' | 'genres' | 'social' | 'sponsors'
export type IContestAssociationIdFieldnames = 'ParamId' | 'GenreId' | 'SocialMediumId' | 'SponsorId' 

export type IRelationshipIdFieldnames = 'BrandId' | 'StateId' | 'MediumId' | 'RoleId' | 'LogoId' | 'FrameId' | 'BannerId' | 'FaviconId' // TO DO: REMOVE MEDIA
export type IMedialessRelationshipIdFieldnames = Exclude<IRelationshipIdFieldnames, 'MediumId'>

export type IContestRelationshipIdFields = Exclude<IRelationshipIdFieldnames, "MediumId" | "RoleId">
export type IInscriptionRelationshipIdFields = Exclude<IRelationshipIdFieldnames, "BrandId" | "StateId" | "RoleId">
export type ISponsorRelationshipIdFields = Exclude<IRelationshipIdFieldnames, "BrandId" | "StateId" | "RoleId">
export type IManagerRelationshipIdFields = Exclude<IRelationshipIdFieldnames, "BrandId" | "StateId" | "MediumId">

