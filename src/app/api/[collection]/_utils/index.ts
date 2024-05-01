import { Brand, Contest, ContestMedia, Genre, Param, State } from "@/database";
import { IOneOfCollectionNames } from "@/interfaces";
import { Model, ModelStatic, Options } from "sequelize";

const modelsByCollectionName = {
    contests: {
        Model: Contest,
        options: {
            include: [
                State, 
                Genre,
                Brand, 
                { 
                    model: Param,
                    attributes: ['id', 'name', 'description'],
                    through: { 
                        attributes: [] }
                }, {
                    model: ContestMedia,
                    attributes: ['src', 'type'],
                    through: {
                        attributes: []
                    }
                }
                
            ]
        }
    },
    brands: {
        Model: Brand,
        options: {
            include: [ Contest ]
        }
    }
} as { [key in IOneOfCollectionNames]: { Model: ModelStatic<Model<any, any>>, options: Options }}

export const getModelByCollectionName = (collection: IOneOfCollectionNames) => modelsByCollectionName[collection]