
import { Contest, Inscription } from '@/database'
import { constructAPIResponse } from '@/app/api/_utils'

export const GET = async (req: Request, { params } : { params: { contestId: string }}) => {

    const { contestId } = params

    const inscriptions = await Inscription.findAll({ 
        where: { ContestId: contestId },
        order: [['createdAt', 'DESC']]
     }).then(data => data)

    const contest = await Contest.findOne({ 
        where: { id: contestId }
    }).then(data => data)

    return Response.json(
        constructAPIResponse({ 
            message: 'OK!',
            success: true,
            error: null,
            data: { contest, inscriptions }
        })
    )

}
/* 
export const POST = async (req: Request, { params } : { params: { collection: IOneOfCollectionNames }}) => {

    const { collection } = params

    const { Model } = getModelByCollectionName(collection)

    const payload = await req.json()
    const transaction = await sequelize.transaction()

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

        await logError({ 
            error, 
            collection,
            route: `/api/${ collection }`
        })

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
 */