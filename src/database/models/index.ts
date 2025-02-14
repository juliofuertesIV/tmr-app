'use strict';

import { Sequelize, DataTypes, Options, FindOptions, ModelStatic, Model } from 'sequelize'

// Models Import (Static import for individual models)
import BrandModel from './brand.js';
import ContestModel from './contest.js';
import ContestParamModel from './contestparam.js';
import ContestSocialModel from './contestsocial.js';
import ContestManagerModel from './contestmanager.js';
import FooterModel from './footer.js';
import FooterSponsorModel from './footersponsor.js';
import InscriptionModel from './inscription.js';
import InscriptionTagModel from './inscriptiontags.js';
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
import { getManagerScopes } from './scopes/managers.js';
import { getContestScopes } from './scopes/contests.js';
import { getInscriptionScopes } from './scopes/inscriptions.js';
import { getVoteScopes } from './scopes/votes.js';
import { getMediaScopes } from './scopes/media.js';

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
const InscriptionTag = InscriptionTagModel(sequelize, DataTypes)
const Contest = ContestModel(sequelize, DataTypes)
const Manager = ManagerModel(sequelize, DataTypes)

const models = [
    { model: Brand, getScopeList: null },
    { model: ContestParam, getScopeList: null },
    { model: ContestSocial, getScopeList: null },
    { model: ContestManager, getScopeList: null },
    { model: Footer, getScopeList: null },
    { model: FooterSponsor, getScopeList: null },
    { model: Inscription, getScopeList: getInscriptionScopes },
    { model: InscriptionTag, getScopeList: null },
    { model: Log, getScopeList: null },
    { model: Media, getScopeList: getMediaScopes },
    { model: Param, getScopeList: null },
    { model: Role, getScopeList: null },
    { model: SocialMedia, getScopeList: null },
    { model: Sponsor, getScopeList: null },
    { model: State, getScopeList: null },
    { model: TagCategory, getScopeList: null },
    { model: Tag, getScopeList: null },
    { model: TMRVote, getScopeList: null },
    { model: Manager, getScopeList: getManagerScopes },
    { model: Contest, getScopeList: getContestScopes },
    { model: Vote, getScopeList: getVoteScopes },
]


type ScopeList = { name: string, scope: FindOptions }[]

const addScopes = ({ 
    getScopeList,
    model,
    listOfModels 
} : { 
    getScopeList: (listOfModels: { [key: string]: ModelStatic<Model<any, any>>; }) => any,
    model: ModelStatic<Model>,
    listOfModels: { [key: string]: ModelStatic<Model<any, any>>; } 
}) => {
        
    const scopes = getScopeList(listOfModels) as ScopeList

    scopes.forEach((one) => {
        model.addScope(
            one.name,
            one.scope
        )
    })
}

models.forEach((item) => {

    const { model, getScopeList } = item
    
    if (model.associate) model.associate(sequelize.models);
   
    if (getScopeList) {
        addScopes({ getScopeList, listOfModels: sequelize.models, model })
    }    
});

export {
    Brand,
    Contest,
    ContestParam,
    ContestSocial,
    ContestManager,
    Footer,
    FooterSponsor,
    Inscription,
    InscriptionTag,
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
    Vote,
    Voter,
    sequelize
}



