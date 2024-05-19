
import { sequelize } from '@/database'
import { IOneOfCollectionNames } from '@/types'
import { getModelByCollectionName } from './_utils'
import { constructAPIResponse } from '../_utils'

export const GET = async (req: Request, { params } : { params: { collection: IOneOfCollectionNames }}) => {

    const { collection } = params
    const { Model, options } = getModelByCollectionName(collection)

    const data = await Model.findAll({ ...options }).then(data => data)

    return Response.json(
        constructAPIResponse({ 
            message: 'OK!',
            success: true,
            error: null,
            data 
        })
    )

}

export const POST = async (req: Request, { params } : { params: { collection: IOneOfCollectionNames }}) => {

    const { collection } = params

    const { Model } = getModelByCollectionName(collection)

    const payload = await req.json()
    const transaction = await sequelize.transaction()

    console.log({ payload })

    try {
        const data = await Model.create({ ...payload }, { transaction })
        await transaction.commit()
        return Response.json(
            constructAPIResponse({ 
                message: "Elemento creado correctamente.",
                success: true,
                error: null,
                data 
            })
        )
    }
    catch (error) {
        await transaction.rollback();
        return Response.json(
            constructAPIResponse({ 
                message: "Ha habido un problema creando el elemento.",
                success: false,
                error,
                data: null 
            })
        )
    }
}
