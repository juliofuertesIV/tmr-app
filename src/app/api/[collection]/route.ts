
import { ICollectionNames } from '@/types'
import { getCollectionByName } from './_functions/get'
import { addToCollection } from './_functions/post'

export const GET = async (req: Request, { params } : { params: { collection: ICollectionNames }}) => {

    const { collection } = params
    
    return await getCollectionByName({ collection })
}

export const POST = async (req: Request, { params } : { params: { collection: ICollectionNames }}) => {

    const { collection } = params

    const formData = await req.formData()

    return await addToCollection({ collection, formData })
    
}
