
import { getCollectionByName } from '../[collection]/_functions/get'
import { addToCollection } from '../[collection]/_functions/post'

export const GET = async (req: Request) => {
    
    return await getCollectionByName({ collection: 'contests' })
}

export const POST = async (req: Request) => {

    const formData = await req.formData()

    return await addToCollection({ collection: 'contests', formData })
    
}
