import { IBrand, IContest, IContestState, IGenre, IInscription, IManager, IManagerRole, IParam, ISocialMedia, ISponsor } from "."
import { IMedia } from "./media"

export type ICollectionsWithAssociations = IContest | IManager | ISponsor | IInscription
export type ICollectionsWithAssociationsNames = "contests" | "sponsors" | "inscriptions" | "managers"

export type IAssociation = IParam | IGenre | ISocialMedia | IManagerRole | ISponsor | IMedia
export type IMedialessAssociation = Exclude<IAssociation, IMedia>

export type IRelationship = IBrand | IContestState | IMedia
export type IMedialessRelationship = Exclude<IRelationship, IMedia>

export type IRelationshipNames = 'brand' | 'state' | 'media'
export type IMedialessRelationshipNames = Exclude<IRelationshipNames, 'media'>

export type IAssociationNames = 'params' | 'genres' | 'social' | 'media'
export type IMedialessAssociationNames = Exclude<IAssociationNames, 'media'>

export type IAssociationKeys = 'Params' | 'Genres' | 'SocialMedia' | 'Media'
export type IMedialessAssociationKeys = Exclude<IAssociationKeys, "Media">

export type IAssociationIdFieldnames = 'ParamId' | 'GenreId' | 'SocialMediumId' | 'MediumId'
export type IMedialessAssociationIdFieldnames = Exclude<IAssociationIdFieldnames, 'MediumId'>

export type IRelationshipIdFieldnames = 'BrandId' | 'StateId' | 'MediumId' | 'RoleId'
export type IMedialessRelationshipIdFieldnames = Exclude<IRelationshipIdFieldnames, 'MediumId'>


export type IContestRelationshipIdFields = Exclude<IRelationshipIdFieldnames, "MediumId" | "RoleId">
export type IInscriptionRelationshipIdFields = Exclude<IRelationshipIdFieldnames, "BrandId" | "StateId" | "RoleId">
export type ISponsorRelationshipIdFields = Exclude<IRelationshipIdFieldnames, "BrandId" | "StateId" | "RoleId">
export type IManagerRelationshipIdFields = Exclude<IRelationshipIdFieldnames, "BrandId" | "StateId" | "MediumId">

