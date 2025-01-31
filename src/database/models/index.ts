'use strict';

import { Sequelize, DataTypes, Options } from 'sequelize'

// Models Import (Static import for individual models)
import BrandModel from './brand.js';
import ContestModel from './contest.js';
import ContestParamModel from './contestparam.js';
import ContestGenreModel from './contestgenre.js';
import ContestSocialModel from './contestsocial.js';
import ContestMediaModel from './contestmedia.js';
import ContestSponsorModel from './contestsponsor.js';
import ContestManagerModel from './contestmanager.js';
import FooterModel from './footer.js';
import FooterMediaModel from './footermedia.js';
import GenreModel from './genre.js';
import InscriptionModel from './inscription.js';
import LogModel from './log.js';
import ManagerModel from './manager.js';
import MediaModel from './media.js';
import ParamModel from './param.js';
import RoleModel from './role.js';
import SocialMediaModel from './social-media.js';
import SponsorModel from './sponsor.js';
import StateModel from './state.js';
import TagTypeModel from './tag-type.js';
import TagModel from './tag.js';
import TMRVoteModel from './tmrvote.js';
import VoteModel from './vote.js';
import VoterModel from './voter.js';

import configData from '../config/config.js'

const env = process.env.NODE_ENV || 'development';
const config = configData[env] as Options
const sequelize = new Sequelize({ ...config })

const Brand = BrandModel(sequelize, DataTypes)
const Contest = ContestModel(sequelize, DataTypes)
const ContestParam = ContestParamModel(sequelize, DataTypes)
const ContestGenre = ContestGenreModel(sequelize, DataTypes)
const ContestSocial = ContestSocialModel(sequelize, DataTypes)
const ContestMedia = ContestMediaModel(sequelize, DataTypes)
const ContestSponsor = ContestSponsorModel(sequelize, DataTypes)
const ContestManager = ContestManagerModel(sequelize, DataTypes)
const Footer = FooterModel(sequelize, DataTypes)
const FooterMedia = FooterMediaModel(sequelize, DataTypes)
const Genre = GenreModel(sequelize, DataTypes)
const Inscription = InscriptionModel(sequelize, DataTypes)
const Log = LogModel(sequelize, DataTypes)
const Manager = ManagerModel(sequelize, DataTypes)
const Media = MediaModel(sequelize, DataTypes)
const Param = ParamModel(sequelize, DataTypes)
const Role = RoleModel(sequelize, DataTypes)
const SocialMedia = SocialMediaModel(sequelize, DataTypes)
const Sponsor = SponsorModel(sequelize, DataTypes)
const State = StateModel(sequelize, DataTypes)
const TagType = TagTypeModel(sequelize, DataTypes)
const Tag = TagModel(sequelize, DataTypes)
const TMRVote = TMRVoteModel(sequelize, DataTypes)
const Vote = VoteModel(sequelize, DataTypes)
const Voter = VoterModel(sequelize, DataTypes)

const models = [
    Brand,
    Contest,
    ContestParam,
    ContestGenre,
    ContestSocial,
    ContestMedia,
    ContestSponsor,
    ContestManager,
    Footer,
    FooterMedia,
    Genre,
    Inscription,
    Log,
    Manager,
    Media,
    Param,
    Role,
    SocialMedia,
    Sponsor,
    State,
    TagType,
    Tag,
    TMRVote,
    Vote
]

models.forEach((model) => {
    if (model.associate) {
        model.associate(sequelize.models);
    }
});

export {
    Brand,
    Contest,
    ContestParam,
    ContestGenre,
    ContestSocial,
    ContestMedia,
    ContestSponsor,
    ContestManager,
    Genre,
    Inscription,
    Log,
    Manager,
    Media,
    Param,    
    Role,
    SocialMedia,
    Sponsor,
    State,
    TagType,
    Tag,
    TMRVote,
    Vote,
    Voter,
    sequelize
}

