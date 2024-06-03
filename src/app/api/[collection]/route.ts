
import { IOneOfCollectionNames } from '@/types'
import { getCollectionByName } from './_functions/get'
import { addToCollection, addToCollectionWithMedia } from './_functions/post'

export const GET = async (req: Request, { params } : { params: { collection: IOneOfCollectionNames }}) => {

    const { collection } = params
    
    return await getCollectionByName({ collection })
}

export const POST = async (req: Request, { params } : { params: { collection: IOneOfCollectionNames }}) => {

    const { collection } = params

    const formData = await req.formData()

    const creationIncludesMedia = collection === 'inscriptions'

    if (creationIncludesMedia) 
        return await addToCollectionWithMedia({ collection, formData })
    else 
        return await addToCollection({ collection, formData })
}
