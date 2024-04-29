import { ContestMedia, ContestMediaElements, sequelize } from "@/database";
import { IOneOfCollectionNames } from "@/interfaces";
import { Storage } from "@google-cloud/storage";
import { Model, ModelStatic, Options } from "sequelize";

const modelsByCollectionName = {
    contests: {
        Model: ContestMedia,
        AssociationTable: ContestMediaElements,
        options: {}
    }
} as { 
    [key in IOneOfCollectionNames]: { 
        Model: ModelStatic<Model<any, any>>,
        AssociationTable: ModelStatic<Model<any, any>>,
        options: Options 
    }
}

const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    credentials: {
        client_email: process.env.CLIENT_EMAIL,
        private_key: process.env.GCP_PRIVATE_KEY
    }
});

const bucket = storage.bucket(process.env.GCP_BUCKET || '');

const getModelByCollectionName = (collection: IOneOfCollectionNames) => modelsByCollectionName[collection]

export const POST = async (
    req: Request, { params } : 
    { params: { collection: IOneOfCollectionNames }
}) => {

    const { collection } = params

    const { Model, AssociationTable } = getModelByCollectionName(collection)

    const payload = await req.json()
    const transaction = await sequelize.transaction()

    try {
        const data = await Model.create({ ...payload }, { transaction })
        await transaction.commit()
        return Response.json({ 
            message: "Imagen asociada correctamente al concurso.",
            success: true,
            error: null,
            data 
        })
    }
    catch (error) {
        await transaction.rollback();
        return Response.json({ 
            message: "Ha habido un problema asociando la imagen al concurso.",
            success: false,
            error,
            data: null 
        })
    }
}
