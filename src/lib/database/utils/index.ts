import { Brand, Contest, Genre, Inscription, Log, Manager, Media, Role, SocialMedia, Sponsor, Tag, TagType } from "@/database/models";
import { CollectionNames } from "@/types"
import { FindOptions, Model, ModelStatic } from "sequelize";

export const getModelByCollectionName = (collectionName: CollectionNames) => modelsByCollectionName[collectionName]

const modelsByCollectionName = { // TO DO: SCOPESSSS!!
    brands: {
         Model: Brand,
         options: {
            order: [['name', 'ASC']],
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
     [key in CollectionNames]: { 
         Model: ModelStatic<Model<any, any>>,
         options: FindOptions 
     }
 }
 