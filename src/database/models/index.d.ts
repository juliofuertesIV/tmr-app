import { Sequelize, Model, ModelStatic } from 'sequelize';

export const sequelize: Sequelize;
export const SequelizeInstance: typeof Sequelize;

// Add individual model exports
export const Brand: ModelStatic<Model>;
export const Contest: ModelStatic<Model>;
export const Genre: ModelStatic<Model>;
export const Inscription: ModelStatic<Model>;
export const Log: ModelStatic<Model>;
export const Manager: ModelStatic<Model>;
export const Media: ModelStatic<Model>;
export const Param: ModelStatic<Model>;
export const Role: ModelStatic<Model>;
export const SocialMedia: ModelStatic<Model>;
export const Sponsor: ModelStatic<Model>;
export const State: ModelStatic<Model>;
export const TagType: ModelStatic<Model>;
export const Tag: ModelStatic<Model>;
export const TMRVote: ModelStatic<Model>;
export const Vote: ModelStatic<Model>;
export const Voter: ModelStatic<Model>;
export const ContestGenre: ModelStatic<Model>;
export const ContestManager: ModelStatic<Model>;
export const ContestMedia: ModelStatic<Model>;
export const ContestParam: ModelStatic<Model>;
export const ContestSocial: ModelStatic<Model>;
export const ContestSponsor: ModelStatic<Model>;
export const InscriptionTag: ModelStatic<Model>;

// You can also export a default object if needed
declare const db: {
  sequelize: Sequelize;
  SequelizeInstance: typeof Sequelize;
  Brand: ModelStatic<Model>;
  Contest: ModelStatic<Model>;
  Genre: ModelStatic<Model>;
  Inscription: ModelStatic<Model>;
  Log: ModelStatic<Model>;
  Manager: ModelStatic<Model>;
  Media: ModelStatic<Model>;
  Param: ModelStatic<Model>;
  Role: ModelStatic<Model>;
  SocialMedia: ModelStatic<Model>;
  Sponsor: ModelStatic<Model>;
  State: ModelStatic<Model>;
  TagType: ModelStatic<Model>;
  Tag: ModelStatic<Model>;
  TMRVote: ModelStatic<Model>;
  Vote: ModelStatic<Model>;
  Voter: ModelStatic<Model>;
  ContestGenre: ModelStatic<Model>;
  ContestManager: ModelStatic<Model>;
  ContestMedia: ModelStatic<Model>;
  ContestParam: ModelStatic<Model>;
  ContestSocial: ModelStatic<Model>;
  ContestSponsor: ModelStatic<Model>;
  InscriptionTag: ModelStatic<Model>;
  // Add other models here as needed
};

export default db;