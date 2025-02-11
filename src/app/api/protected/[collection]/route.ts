
import { CollectionNames } from '@/types'
import { getCollectionByName } from './_functions/get'
import { addToCollection } from './_functions/post'
import { handleApiError } from '@/lib/errors'
import { constructAPIResponse } from '../../_functions'
import { NextRequest } from 'next/server'

export const GET = async (req: NextRequest, { params } : { params: { collection: CollectionNames }}) => {

    const { collection } = params
    
    try {
        const data = await getCollectionByName({ collection })
        return Response.json(
            constructAPIResponse({
                message: 'Fetched ok.',
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
            route: `/api/${ collection }`
        })
    }
}

export const POST = async (req: NextRequest, { params } : { params: { collection: CollectionNames }}) => {

    const { collection } = params

    const formData = await req.formData()

    try {
        const data = await addToCollection({ collection, formData })
        
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
        return await handleApiError({
            req,
            error, 
            collection,
            route: `/api/${ collection }`
        })
    }
}
