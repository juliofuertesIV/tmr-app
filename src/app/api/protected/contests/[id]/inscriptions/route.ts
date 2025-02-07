
import { constructAPIResponse } from '@/app/api/_utils'
import { Contest, Inscription, Media, Tag } from '@/database/models'
import { handleApiError } from '@/lib/errors'
import { addInscriptionToContest } from './_functions'
import { NextRequest } from 'next/server'

type Params = {
    params: { id: string }
}

export const GET = async (req: NextRequest, { params } : Params) => {

    const { id } = params
    
    try {
        const data = await Inscription.findAll({ 
            where: { ContestId: id }, 
            include: [ Contest, Media, Tag ],
        }).then(data => data)

        console.log({ data })

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
            req,
            error,
            route: '/api/protected/contests/[id]/inscriptions'
        })
    }
}

export const POST = async (req: NextRequest, { params } : Params) => {

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
            req,
            route: '/api/inscriptions',
            error,
            message: 'Fallo inscribiendo candidatura.' 
        })
    }
}
