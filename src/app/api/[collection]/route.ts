
import { ICollectionNames } from '@/types'
import { getCollectionByName } from './_functions/get'
import { addToCollection, addInscription } from './_functions/post'
import { ICollectionsWithMediaNames, ICollectionsWithMediumNames } from '@/types/media'

export const GET = async (req: Request, { params } : { params: { collection: ICollectionNames | ICollectionsWithMediaNames }}) => {

    const { collection } = params
    
    return await getCollectionByName({ collection })
}

export const POST = async (req: Request, { params } : { params: { collection: ICollectionNames | ICollectionsWithMediaNames }}) => {

    const { collection } = params

    const formData = await req.formData()

    if (collection === 'inscriptions') {
        return await addInscription({ collection: 'inscriptions' as ICollectionsWithMediumNames, formData })
    }

    return await addToCollection({ collection, formData })
    
}
