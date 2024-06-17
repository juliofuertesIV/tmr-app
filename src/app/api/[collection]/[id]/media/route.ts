import { ICollectionNames } from "@/types";
import { IAssociationNames } from "@/types/associations";
import { handleApiError } from "@/lib/errors";
import { getAssociation } from "../[association]/_functions/get";
import { createAssociationWithMedia } from "../[association]/_functions/post";

type Params = { params: { collection: ICollectionNames, id: string, association: IAssociationNames }}

export const GET = async (req: Request, { params } : Params) => {

    const { collection, id, association } = params

    return await getAssociation({ collection, association, id })
}

export const POST = async (req: Request, { params } : Params) => {

    const { collection, id, association } = params

    await req.formData()
    .then(async (formData) => {
        return await createAssociationWithMedia({ collection, association, id, formData: formData })
    })
    .catch(async (error) => {
        console.log({ error })
        return await handleApiError({
            error,
            message: 'Error parseando la formData',
            route: 'collection/id/association',
            collection
        })
    })
    
}