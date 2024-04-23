
import { Contest, Param, State, Genre, sequelize, Brand } from '@/database'
import { IOneOfCollectionNames } from '@/interfaces'

const modelsByCollectionName = {
    contests: {
        Model: Contest,
        include: [ Param, State, Genre ]
    },
    brands: {
        Model: Brand,
        include: []
    }
}

const getModelByCollectionName = (collection: IOneOfCollectionNames) => modelsByCollectionName[collection]

export const GET = async (req: Request, { params } : { params: { collection: IOneOfCollectionNames }}) => {

    const { collection } = params

    const { Model, include } = getModelByCollectionName(collection)

    const data = await Model.findAll({ include }).then(data => data)
    
    return Response.json({ message: 'OK!', success: true, error: null, data })
}

export const POST = async (req: Request, { params } : { params: { collection: IOneOfCollectionNames }}) => {

    const { collection } = params

    const { Model } = getModelByCollectionName(collection)

    const payload = await req.json()
    const transaction = await sequelize.transaction()

    try {
        const data = await Model.create({ ...payload }, { transaction })
        await transaction.commit()
        return Response.json({ message: "Elemento creado correctamente.", success: true, error: null, data })
    }
    catch (error) {
        await transaction.rollback();
        return Response.json({ message: "Ha habido un problema creando el elemento.", success: false, error, data: null })
    }
}
