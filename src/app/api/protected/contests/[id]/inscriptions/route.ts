
import { constructAPIResponse } from '@/app/api/_utils'
import { Contest, Inscription, Media } from '@/database/models'
import { handleApiError } from '@/lib/errors'
import { addInscriptionToContest } from './_functions'

type Params = {
    params: { id: string }
}

export const GET = async (req: Request, { params } : Params) => {

    const { id } = params
    
    try {
        const data = await Contest.findOne({ 
            where: { id }, 
            include: {
                model: Inscription,
                include: [ Media ]
            }}).then(data => data)
        return Response.json(
            constructAPIResponse({
                message: 'Inscriptions found.',
                success: true,
                error: null,
                data
            })
        )
    }
    catch (error) {
        return await handleApiError({
            error,
            route: '/api/protected/contests/[id]/inscriptions'
        })
    }
}

export const POST = async (req: Request, { params } : Params) => {

    const { id } = params
    const formData = await req.formData()
    
    try {
        const inscription = await addInscriptionToContest({ formData, ContestId: id }) 
        return Response.json(
            constructAPIResponse({ 
                message: "Candidatura inscrita correctamente.",
                success: true,
                error: null,
                data: inscription 
            })
        )
    }
    catch (error) {
        return await handleApiError({
            route: '/api/inscriptions',
            error,
            message: 'Fallo inscribiendo candidatura.' 
        })
    }
}
