
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

    let inscription;

    try {
        inscription = await Inscription.findOne({ where: { id }}).then(data => data)
    } catch (error)  {
        return await handleApiError({
            error,
            route: '/api/inscriptions/[id]'
        })
    }

    return Response.json(
        constructAPIResponse({
            message: 'Fetched.',
            success: true,
            error: null,
            data: inscription
        })
    )
}

export const POST = async (req: Request) => {

    const formData = await req.formData()
    
    let inscription;

    try {
        inscription = await addInscription({ formData }) 
    }
    catch (error) {
        return await handleApiError({
            collection: 'inscriptions',
            route: '/api/inscriptions',
            error,
            message: 'Fallo inscribiendo candidatura.' 
        })
    }

    return Response.json(
        constructAPIResponse({ 
            message: "Candidatura inscrita correctamente.",
            success: true,
            error: null,
            data: inscription 
        })
    )
}
