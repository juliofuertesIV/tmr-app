
import { handleApiError } from '@/lib/errors'
import { getCollectionByName } from '../[collection]/_functions/get'
import { addInscription } from './_functions'
import { constructAPIResponse } from '../_utils'

export const GET = async (req: Request) => {

    return await getCollectionByName({ collection: 'inscriptions' })
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
