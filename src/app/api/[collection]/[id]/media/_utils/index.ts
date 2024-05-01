import { ContestMedia, ContestsMediaElements } from "@/database";
import { IOneOfCollectionNames } from "@/interfaces";
import { Model, ModelStatic, Options } from "sequelize";
import path from "path";

export const modelsByCollectionName = {
    contests: {
        Model: ContestMedia,
        AssociationTable: ContestsMediaElements,
        options: {}
    }
} as { 
    [key in IOneOfCollectionNames]: { 
        Model: ModelStatic<Model<any, any>>,
        AssociationTable: ModelStatic<Model<any, any>>,
        options: Options
    }
}

export const getModelAndAssociationTableByCollectionName = (collection: IOneOfCollectionNames) => modelsByCollectionName[collection]

export const produceFileName = (fileName: string) => crypto.randomUUID() + "-" + new Date().getTime() + path.extname(fileName);

export const bucketName = process.env.GCP_BUCKET as string

export const limitInMegaBytes = 2

export const getFilesizeLimitInBytes = (mbNumber: number) => 1024 * 1024 * mbNumber


