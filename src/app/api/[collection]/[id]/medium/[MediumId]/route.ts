
import { handleApiError } from "@/lib/errors";
import { addMediaToCollectionItem, getCollectionItemMediumById } from "../_functions";
import { ICollectionsWithMediumNames } from "@/types/media";
import { constructAPIResponse } from "@/app/api/_utils";
import { deleteMediaInStorageAndDatabase } from "@/lib/media/delete";

type Params = { params: { collection: ICollectionsWithMediumNames, id: string, MediumId: string }}

export const GET = async (req: Request, { params } : Params) => {

    const { collection, id, MediumId } = params

    const medium = await getCollectionItemMediumById(collection, id)
    .then(data => data)
    .catch(async error => {
        return await handleApiError({
            error,
            route: `/api/${ collection }/[id]/medium/[MediumId]`

        })
    })

    return Response.json(
        constructAPIResponse({
            message: 'Retrieved.',
            success: true,
            error: null,
            data: medium
        })
    )
}

export const PUT = async (req: Request, { params } : Params) => {

    const { collection, id, MediumId } = params

    try {
        await deleteMediaInStorageAndDatabase({ MediumId })
    }
    catch (error) {
        return await handleApiError({
            error,
            route: `/api/${ collection }/[id]/medium/[MediumId]`
        })
    }
    
    const formData = await req.formData()

    try {
        await addMediaToCollectionItem({ collection, id, formData })    
    } catch (error) {
        return await handleApiError({
            error,
            route: `/api/${ collection }/[id]/medium/ (PUT)`
        }) 
    }

    return Response.json(
        constructAPIResponse({
            message: 'Image updated',
            success: true,
            error: null,
            data: null
        })
    )
}

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

