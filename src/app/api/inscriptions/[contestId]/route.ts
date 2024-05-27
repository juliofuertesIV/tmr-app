
import { Contest, Inscription } from '@/database'
import { constructAPIResponse } from '@/app/api/_utils'
import { handleApiError } from '../../_utils/errors'

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

export const POST = async (req: Request, { params } : { params: { contestId: string }}) => {

    const { contestId } = params
    const payload = await req.formData()

    try {
        const data = await Inscription.create({ ...payload })
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
        await handleApiError({
            error,
            message: 'Ha habido un error iniciando la inscripción en la base de datos',
            route: '/inscriptions/' + contestId,
            collection: 'inscriptions'
        })
    }
}
