import { ICollectionNames } from "@/types";
import { IAssociationNames } from "@/types/associations";
import { createAssociation, createAssociationWithMedia } from "./_functions/post";
import { getAssociation } from "./_functions/get";

type Params = { params: { collection: ICollectionNames, id: string, association: IAssociationNames }}

export const GET = async (req: Request, { params } : Params) => {

    const { collection, id, association } = params

    return await getAssociation({ collection, association, id })
}

export const POST = async (req: Request, { params } : Params) => {

    const { collection, id, association } = params

    const formData = await req.formData()

    if (association === 'media') 
        return await createAssociationWithMedia({ collection, association, id, formData })

    else 
        return await createAssociation({ collection, id, association, formData: formData })
    
}