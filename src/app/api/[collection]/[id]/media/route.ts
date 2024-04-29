import { ContestMedia, ContestMediaElements, sequelize } from "@/database";
import { IOneOfCollectionNames } from "@/interfaces";
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
