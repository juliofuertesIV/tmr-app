import { Brand, Contest, Media, SocialMedia, Manager, Role, Log, Sponsor, Tag, TagCategory, Inscription } from '@/database/models';
import { CollectionNames } from "@/types";
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
    tagCategories: {
        Model: TagCategory,
        options: {
            include: [Tag],
            order: [['name', 'ASC']]
        }
    }
} as { 
    [key in CollectionNames]: { 
        Model: ModelStatic<Model<any, any>>,
        options: FindOptions 
    }
}

export const getModelByCollectionName = (collection: CollectionNames) => modelsByCollectionName[collection]

