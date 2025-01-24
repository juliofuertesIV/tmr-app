
import { handleApiError } from "@/lib/errors";
import { addMediaToCollectionItem, deleteCollectionItemMedia } from "../_functions";
import { ICollectionsWithMediumNames } from "@/types/media";
import { constructAPIResponse } from "@/app/api/_utils";

type Params = { params: { collection: ICollectionsWithMediumNames, id: string, MediumId: string }}

export const GET = async (req: Request, { params } : Params) => {

    const { collection, id } = params

}

export const PUT = async (req: Request, { params } : Params) => {

    const { collection, id, MediumId } = params

    try {
        await deleteCollectionItemMedia({ MediumId })
    }
    catch (error) {
        return handleApiError({
            error,
            route: `/api/${ collection }/[id]/medium/[MediumId]`
        })
    }
    
    const formData = await req.formData()

    try {
        await addMediaToCollectionItem({ collection, id, formData })    
    } catch (error) {
        return handleApiError({
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
        await deleteCollectionItemMedia({ MediumId })
    }
    catch (error) {
        return handleApiError({
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