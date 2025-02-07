import { Brand, Contest, Media, Genre, SocialMedia, Manager, Role, Log, Sponsor, Tag, TagType, Inscription } from '@/database/models';
import { ICollectionNames } from "@/types";
import { FindOptions, Model, ModelStatic } from "sequelize";

const modelsByCollectionName = {
   brands: {
        Model: Brand,
        options: {
            include: [ Contest ]
        }
    },
    social: {
        Model: SocialMedia,
        options: {}
    },
    inscriptions: {
        Model: Inscription,
        options: {
            include: [Contest]
        }
    },
    genres: {
        Model: Genre,
        options: {}
    },
    managers: {
        Model: Manager,
        options: {
            include: [ Role, Media ]
        }
    },
    logs: {
        Model: Log,
        options: {
            order: [['createdAt', 'DESC']]
        }
    },
    sponsors: {
        Model: Sponsor,
        options: {
            include: [ Media ],
            order: [['name', 'ASC']]
        }
    },
    tags: {
        Model: Tag,
        options: {
            order: [['name', 'ASC']]
        }
    },
    tagtypes: {
        Model: TagType,
        options: {
            include: [Tag],
            order: [['name', 'ASC']]
        }
    }
} as { 
    [key in ICollectionNames]: { 
        Model: ModelStatic<Model<any, any>>,
        options: FindOptions 
    }
}

export const getModelByCollectionName = (collection: ICollectionNames) => modelsByCollectionName[collection]

