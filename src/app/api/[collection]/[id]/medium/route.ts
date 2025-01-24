import { handleApiError } from "@/lib/errors";
import { getAssociation } from "../[association]/_functions/get";
import { addMediaToCollectionItem } from "./_functions";
import { ICollectionsWithMediumNames } from "@/types/media";
import { constructAPIResponse } from "@/app/api/_utils";

type Params = { params: { collection: ICollectionsWithMediumNames, id: string }}

export const GET = async (req: Request, { params } : Params) => {

    const { collection, id } = params

    return await getAssociation({ collection, association: 'media', id })
}

export const POST = async (req: Request, { params } : Params) => {

    const { collection, id } = params

    const formData = await req.formData()

    try {
        await addMediaToCollectionItem({ collection, id, formData })    
    } catch (error) {
        return handleApiError({
            error,
            route: `/api/${ collection }/[id]/medium`
        })
    }

    return Response.json(
        constructAPIResponse({
            message: 'Image added',
            success: true,
            error: null,
            data: null
        })
    )
}
