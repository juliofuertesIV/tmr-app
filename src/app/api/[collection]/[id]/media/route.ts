import { ICollectionNames } from "@/types";
import { getAssociation } from "../[association]/_functions/get";
import { createAssociationWithMedia, updateAssociatedMedia } from "./_functions";
import { ICollectionsWithMediaNames } from "@/types/media";
import { deleteMedia } from "@/lib/media/delete";
import { deleteAssociatedMedia } from "./_functions/delete";


type Params = { params: { collection: ICollectionNames, id: string }}

export const GET = async (req: Request, { params } : Params) => {

    const { collection, id } = params

    return await getAssociation({ collection, association: 'media', id })
}

export const POST = async (req: Request, { params } : Params) => {

    const { collection, id } = params

    const formData = await req.formData()

    return await createAssociationWithMedia({ collection, id, formData })    
}

export const PUT = async (req: Request, { params } : Params) => {

    const { collection, id } = params

    const formData = await req.formData()

    return await updateAssociatedMedia({ collection: collection as ICollectionsWithMediaNames, id, formData })    
}

export const DELETE = async (req: Request, { params } : Params) => {
    
    const { collection, id } = params

    const formData = await req.formData()

    return await deleteAssociatedMedia({ collection: collection as ICollectionsWithMediaNames, id, formData })

}