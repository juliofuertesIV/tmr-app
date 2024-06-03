import { IOneOfCollectionNames } from "@/types";
import { constructAPIResponse } from "@/app/api/_utils";
import { deleteMedia } from "@/media/delete";

type Params = {
    id: string,
    mediaId: string,
    collection: IOneOfCollectionNames
}

export const DELETE = async (req: Request, { params } : { params: Params }) => {

    const { collection, id, mediaId } = params

    if (collection === 'contests') {
        return Response.json(
            constructAPIResponse({
                message: 'Not implemented. Destroy association table row and then media.',
                error: new Error('Not implemented.'),
                success: false,
                data: null
            })
        )
    }

    return await deleteMedia({ mediaId })
}
