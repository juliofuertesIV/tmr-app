import { Brand, Contest, Genre, Param, State, sequelize } from "@/database";
import { IOneOfCollectionNames } from "@/interfaces";

const modelsByCollectionName = {
    contests: {
        Model: Contest,
        include: [ Param, State, Genre, Brand ]
    },
    brands: {
        Model: Brand,
        include: []
    }
}

const getModelByCollectionName = (collection: IOneOfCollectionNames) => modelsByCollectionName[collection]


export const GET = async (req: Request, { params } : { params: { collection: IOneOfCollectionNames, id: string | number }}) => {

    const { id, collection } = params

    const { Model, include } = getModelByCollectionName(collection)

    const contest = await Model.findOne({ where: { id }, include }).then(data => data)

    return Response.json({ message: 'OK', success: true, error: null, data: contest })

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
