'use strict';

import { Sequelize, DataTypes, Options } from 'sequelize'

// Models Import (Static import for individual models)
import BrandModel from './brand.js';
import ContestModel from './contest.js';
import ContestParamModel from './contestparam.js';
import ContestSocialModel from './contestsocial.js';
import ContestManagerModel from './contestmanager.js';
import FooterModel from './footer.js';
import FooterSponsorModel from './footersponsor.js';
import InscriptionModel from './inscription.js';
import LogModel from './log.js';
import ManagerModel from './manager.js';
import MediaModel from './media.js';
import ParamModel from './param.js';
import RoleModel from './role.js';
import SocialMediaModel from './social-media.js';
import SponsorModel from './sponsor.js';
import StateModel from './state.js';
import TagCategoryModel from './tagcategory.js';
import TagModel from './tag.js';
import TMRVoteModel from './tmrvote.js';
import VoteModel from './vote.js';
import VoterModel from './voter.js';

import configData from '../config/config.js'

const env = process.env.NODE_ENV || 'development';
const config = configData[env] as Options
const sequelize = new Sequelize({ ...config })

// TO DO: order in which this is called affects scopes
const Media = MediaModel(sequelize, DataTypes)
const Brand = BrandModel(sequelize, DataTypes)
const Footer = FooterModel(sequelize, DataTypes)
const State = StateModel(sequelize, DataTypes)
const ContestParam = ContestParamModel(sequelize, DataTypes)
const ContestSocial = ContestSocialModel(sequelize, DataTypes)
const ContestManager = ContestManagerModel(sequelize, DataTypes)
const FooterSponsor = FooterSponsorModel(sequelize, DataTypes)
const Log = LogModel(sequelize, DataTypes)
const Param = ParamModel(sequelize, DataTypes)
const Role = RoleModel(sequelize, DataTypes)
const SocialMedia = SocialMediaModel(sequelize, DataTypes)
const Sponsor = SponsorModel(sequelize, DataTypes)
const TagCategory = TagCategoryModel(sequelize, DataTypes)
const TMRVote = TMRVoteModel(sequelize, DataTypes)
const Voter = VoterModel(sequelize, DataTypes)
const Vote = VoteModel(sequelize, DataTypes)
const Tag = TagModel(sequelize, DataTypes)
const Inscription = InscriptionModel(sequelize, DataTypes)
const Contest = ContestModel(sequelize, DataTypes)
const Manager = ManagerModel(sequelize, DataTypes)

const models = [
    Brand,
    ContestParam,
    ContestSocial,
    ContestManager,
    Footer,
    FooterSponsor,
    Inscription,
    Log,
    Manager,
    Media,
    Param,
    Role,
    SocialMedia,
    Sponsor,
    State,
    TagCategory,
    Tag,
    TMRVote,
    Contest,
    Vote
]

models.forEach((model) => {
    if (model.associate) {
        model.associate(sequelize.models);
    }
});

export {
    Brand as Brand,
    Contest as Contest,
    ContestParam as ContestParam,
    ContestSocial as ContestSocial,
    ContestManager as ContestManager,
    Footer as Footer,
    FooterSponsor as FooterSponsor,
    Inscription as Inscription,
    Log as Log,
    Manager as Manager,
    Media as Media,
    Param as Param,
    Role as Role,
    SocialMedia as SocialMedia,
    Sponsor as Sponsor,
    State as State,
    TagCategory as TagCategory,
    Tag as Tag,
    TMRVote as TMRVote,
    Vote as Vote,
    Voter as Voter,
    sequelize
}

