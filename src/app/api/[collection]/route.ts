
import { IOneOfCollectionNames } from '@/types'
import { getElementsByCollectionName } from './_functions/get'
import { createItem, createItemWithMedia } from './_functions/post'

export const GET = async (req: Request, { params } : { params: { collection: IOneOfCollectionNames }}) => {

    const { collection } = params
    
    return await getElementsByCollectionName({ collection })

}

export const POST = async (req: Request, { params } : { params: { collection: IOneOfCollectionNames }}) => {

    const { collection } = params

    const formData = await req.formData()

    const creationIncludesMedia = collection === 'inscriptions'

    return creationIncludesMedia ? await createItemWithMedia({ collection, formData }) : await createItem({ collection, formData })
}
