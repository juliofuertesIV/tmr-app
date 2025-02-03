
import { handleApiError } from '@/lib/errors'
import { constructAPIResponse } from '../../../../_utils'
import { Inscription } from '@/database/models'
import { updateInscription } from '../_functions'


type RouteParams = {
    params: {
        id: string,
        inscriptionId: string
    }
}

export const GET = async (req: Request, { params } : RouteParams) => {

    const { inscriptionId } = params

    try {
        const inscription = await Inscription.findOne({ where: { id: inscriptionId }}).then(data => data)

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

export const PUT = async (req: Request, { params } : RouteParams) => {

    const formData = await req.formData()

    const { inscriptionId } = params
    
    try {
        await updateInscription({ formData, id: inscriptionId })
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
            message: "Candidatura actualizada correctamente.",
            success: true,
            error: null,
            data: null 
        })
    )
}


export const DELETE = async (req: Request, { params } : RouteParams) => {

    const { inscriptionId } = params
    
    try {
        const inscription = await Inscription.destroy({ where: { id: inscriptionId }}) 

        return Response.json(
            constructAPIResponse({ 
                message: "Candidatura eliminada correctamente.",
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
            message: 'Fallo eliminando candidatura.' 
        })
    }
}
