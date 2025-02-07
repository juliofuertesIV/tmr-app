
import { handleApiError } from '@/lib/errors'
import { Contest, Inscription } from '@/database/models'
import { updateInscription } from '../_functions'
import { constructAPIResponse } from '@/app/api/_utils'
import { NextRequest } from 'next/server'


type RouteParams = {
    params: {
        id: string,
        inscriptionId: string
    }
}

export const GET = async (req: NextRequest, { params } : RouteParams) => {

    const { inscriptionId } = params

    try {
        const inscription = await Inscription.findOne({ where: { id: inscriptionId }, include: [ Contest ]}).then(data => data)

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
            req,
            error,
            route: '/api/inscriptions/[id]'
        })
    }
}

export const PUT = async (req: NextRequest, { params } : RouteParams) => {

    const formData = await req.formData()

    const { inscriptionId } = params
    
    try {
        await updateInscription({ formData, id: inscriptionId })
    }
    catch (error) {
        return await handleApiError({
            req,
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


export const DELETE = async (req: NextRequest, { params } : RouteParams) => {

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
            req,
            route: '/api/inscriptions',
            error,
            message: 'Fallo eliminando candidatura.' 
        })
    }
}
