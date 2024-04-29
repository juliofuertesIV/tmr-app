import { Brand, Contest, ContestParam, Genre, Param, State, sequelize } from "@/database";
import { IOneOfCollectionNames } from "@/interfaces";
import { Model, ModelStatic, Options } from "sequelize";

const modelsByCollectionName = {
    contests: {
        Model: Contest,
        options: {
            include: [
                { model: Param, through: 'contestparams' },
                { model: State },
                { model: Genre },
                { model: Brand }
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

const getModelByCollectionName = (collection: IOneOfCollectionNames) => modelsByCollectionName[collection]


export const GET = async (req: Request, { params } : { params: { collection: IOneOfCollectionNames, id: string | number }}) => {

    const { id, collection } = params

    const { Model, options } = getModelByCollectionName(collection)

    try {
        const contest = await Model.findOne({ where: { id }, ...options }).then(data => data).catch(error => console.log({ error }))
        return Response.json({ message: 'OK', success: true, error: null, data: contest })
    }
    catch (error) {
        return Response.json({ message: 'Failed to fetch', success: false, error, data: null })
    }
}

export const PUT = async (req: Request, { params } : { params: { collection: IOneOfCollectionNames, id: string | number }}) => {

    const { id, collection } = params

    const { Model } = getModelByCollectionName(collection)

    const payload = await req.json()

    const transaction = await sequelize.transaction()

    try {
        const affectedRows = await Model.update({ ...payload }, { where: { id }, transaction })
        await transaction.commit()

        console.log({ affectedRows })
        return Response.json({ message: "Elemento editado correctamente.", success: true, error: null, data: affectedRows })
    }
    catch (error) {
        await transaction.rollback();
        return Response.json({ message: "No se ha podido editar el elemento.", success: true, error, data: null })
    }
}
