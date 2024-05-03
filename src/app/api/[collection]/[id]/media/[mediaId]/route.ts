import { IContestMediaRole, IOneOfCollectionNames } from "@/interfaces";
import { constructAPIResponse } from "@/app/api/_utils";

type IMediaPayload = {
    media: File,
    mediaType: IContestMediaRole | 'inscription'
}

type Params = {
    id: string,
    mediaId: string,
    collection: IOneOfCollectionNames
}

export const DELETE = async (req: Request, { params } : { params: Params }) => {

    const { collection, id, mediaId } = params

    const payload = Object.fromEntries(await req.formData()) as IMediaPayload

    try {
        //await deleteFromCloudStorage({ mediaId })
    }
    catch (error) {
        return Response.json(
            constructAPIResponse({
                message: 'Error eliminando la imagen de Cloud Storage',
                success: false,
                error,
                data: null
            })
        )
    }
}