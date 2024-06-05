
import { ICollectionNames } from '@/types'
import { getCollectionByName } from './_functions/get'
import { addToCollection, addToCollectionWithMedia } from './_functions/post'
import { collectionCreationIncludesMedia } from './_utils'
import { ICollectionsWithMediaNames } from '@/types/media'

export const GET = async (req: Request, { params } : { params: { collection: ICollectionNames | ICollectionsWithMediaNames }}) => {

    const { collection } = params
    
    return await getCollectionByName({ collection })
}

export const POST = async (req: Request, { params } : { params: { collection: ICollectionNames | ICollectionsWithMediaNames }}) => {

    const { collection } = params

    const formData = await req.formData()

    const creationIncludesMedia = collectionCreationIncludesMedia(collection)

    if (creationIncludesMedia && formData.has('file')) 
        return await addToCollectionWithMedia({ 
            collection: collection as ICollectionsWithMediaNames, 
            formData 
        })
    else 
        return await addToCollection({ collection, formData })
}
