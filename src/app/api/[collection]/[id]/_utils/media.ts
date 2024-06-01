import { IMedia, IOneOfCollectionNames } from "@/types";
import { Transaction } from "sequelize";
import { Media, ContestMedia } from "@/database";
import { Model, ModelStatic, Options } from "sequelize";

export const modelsByCollectionName = {
    contests: {
        Model: Media,
        AssociationTable: ContestMedia,
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


export const getAssociationPayload = (
    collection: 'contests' | 'inscriptions',
    collectionElementId: string | number,
    mediaElementId: string | number) => { 

    if (collection === 'contests') return { 
        ContestId: collectionElementId,
        MediumId: mediaElementId 
    }
    else {
        return Response.json({ 
            message: 'No payload. La creación de inscription media no está implementada.',
            success: false,
            error: new Error('Too soon!'),
            data: null 
        })
    }
}


export const createAndAssociateMediaToCollection = async ({ collection, payload, transaction, id } : { 
    collection: IOneOfCollectionNames,
    payload: any,
    transaction: Transaction,
    id: string | number 
}) => {

    const { Model, AssociationTable } = getModelAndAssociationTableByCollectionName(collection);

    const insertedImage = await Model.create({ ...payload }, { transaction }) as unknown as IMedia;

    const associationPayload = getAssociationPayload('contests', id, insertedImage.id);

    const relationship = await AssociationTable.create({ ...associationPayload }, { transaction });

    return relationship;
}

