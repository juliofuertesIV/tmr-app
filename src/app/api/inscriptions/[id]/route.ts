
import { handleApiError } from '@/lib/errors'
import { addInscription } from '../_functions'
import { constructAPIResponse } from '../../_utils'
import { Inscription } from '@/database/models'

type RouteParams = {
    params: {
        id: string
    }
}

export const GET = async (req: Request, { params } : RouteParams) => {

    const { id } = params

    try {
        const inscription = await Inscription.findOne({ where: { id }}).then(data => data)

        return Response.json(
            constructAPIResponse({
                message: 'Fetched.',
                success: true,
                error: null,
                data: inscription
            })
        )
    } catch (error)  {
        return await handleApiError({
            error,
            route: '/api/inscriptions/[id]'
        })
    }
}

export const POST = async (req: Request) => {

    const formData = await req.formData()
    
    try {
        const inscription = await addInscription({ formData }) 

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
            collection: 'inscriptions',
            route: '/api/inscriptions',
            error,
            message: 'Fallo inscribiendo candidatura.' 
        })
    }
}
