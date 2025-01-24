
import { handleApiError } from "@/lib/errors";
import { ICollectionsWithMediumNames } from "@/types/media";
import { constructAPIResponse } from "@/app/api/_utils";
import { deleteMediaInStorageAndDatabase } from "@/lib/media/delete";

type Params = { params: { collection: ICollectionsWithMediumNames, id: string, MediumId: string }}

export const DELETE = async (req: Request, { params } : Params) => {
    
    const { collection, MediumId } = params

    try {
        await deleteMediaInStorageAndDatabase({ MediumId })
    }
    catch (error) {
        return await handleApiError({
            error,
            route: `/api/${ collection }/[id]/medium/[MediumId]`
        })
    }

    return Response.json(
        constructAPIResponse({
            message: 'Image deleted',
            success: true,
            error: null,
            data: null
        })
    )
}

