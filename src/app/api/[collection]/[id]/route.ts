import { IOneOfCollectionNames } from "@/types";
import { updateCollectionItem } from "./_functions/put";
import { deleteCollectionItem } from "./_functions/delete";
import { getCollectionItemById } from "./_functions/get";

type RouteParams = {
    params: {
        collection: IOneOfCollectionNames,
        id: string
    }
}

export const GET = async (req: Request, { params } : RouteParams) => {

    const { collection, id } = params
    return await getCollectionItemById({ collection, id })
}

export const PUT = async (req: Request, { params } : RouteParams) => {

    const { collection, id } = params
    return await updateCollectionItem({ collection, id, req })
}

export const DELETE = async (req: Request, { params } : RouteParams) => {

    const { collection, id } = params
    return await deleteCollectionItem({ collection, id })
}
