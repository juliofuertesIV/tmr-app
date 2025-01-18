import { ICollectionNames } from "@/types";
import { updateCollectionItem, updateInscriptionMedia, updateManagerMedia } from "./_functions/update";
import { deleteCollectionItem } from "./_functions/delete";
import { getCollectionItemById } from "./_functions/get";

type RouteParams = {
    params: {
        collection: ICollectionNames,
        id: string
    }
}

export const GET = async (req: Request, { params } : RouteParams) => {

    const { collection, id } = params
    
    return await getCollectionItemById({ collection, id })

}

export const PUT = async (req: Request, { params } : RouteParams) => {

    const { collection, id } = params

    const formData = await req.formData()

    if (collection === 'inscriptions' && formData.has('file')) {
        return await updateInscriptionMedia({ collection, id, formData })
    }

    if (collection === 'managers' && formData.has('file')) {
        //TO DO
        return await updateManagerMedia({ collection, id, formData })
    }
    
    return await updateCollectionItem({ collection, id, formData })
}

export const DELETE = async (req: Request, { params } : RouteParams) => {

    const { collection, id } = params

    return await deleteCollectionItem({ collection, id })

}
