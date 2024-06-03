import { IOneOfCollectionNames } from "@/types";
import { updateElement } from "./_functions/put";
import { deleteElement } from "./_functions/delete";
import { getItemById } from "./_functions/get";

export const GET = async (req: Request, { params } : { params: { collection: IOneOfCollectionNames, id: string }}) => {

    const { collection, id } = params
    return await getItemById({ collection, id })
}

export const PUT = async (req: Request, { params } : { params: { collection: IOneOfCollectionNames, id: string }}) => {

    const { collection, id } = params
    return await updateElement({ collection, id, req })
}

export const DELETE = async (req: Request, { params } : { params: { collection: IOneOfCollectionNames, id: string }}) => {

    const { collection, id } = params
    return await deleteElement({ collection, id })
}
