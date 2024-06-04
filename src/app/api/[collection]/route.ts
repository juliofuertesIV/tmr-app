
import { ICollectionNames } from '@/lib/types'
import { getCollectionByName } from './_functions/get'
import { addToCollection, addToCollectionWithMedia } from './_functions/post'
import { collectionHasMedia } from './_utils'

export const GET = async (req: Request, { params } : { params: { collection: ICollectionNames }}) => {

    const { collection } = params
    
    return await getCollectionByName({ collection })
}

export const POST = async (req: Request, { params } : { params: { collection: ICollectionNames }}) => {

    const { collection } = params

    const formData = await req.formData()

    const creationIncludesMedia = collectionHasMedia(collection)

    if (creationIncludesMedia) 
        return await addToCollectionWithMedia({ collection, formData })
    else 
        return await addToCollection({ collection, formData })
}
