import { ICollectionsWithMediaNames } from "@/types/media";
import { constructAPIResponse } from "@/app/api/_utils";
import { associateMediaToCollectionItem } from "../_functions/media";
import { handleApiError } from "@/lib/errors";

type Params = { params: { collection: ICollectionsWithMediaNames, id: string }}

export const POST = async (req: Request, { params } : Params) => {

    const { collection, id } = params

    const formData = await req.formData()

    try {
        await associateMediaToCollectionItem({ formData, collectionItemId: id })
    } catch (error) {
        return await handleApiError({
            error,
            route: `/api/${ collection }/[id]/media`
        })
    }

    return Response.json(
        constructAPIResponse({
            message: 'Elements associated.',
            success: true,
            error: null,
            data: null
        })

    )
}

