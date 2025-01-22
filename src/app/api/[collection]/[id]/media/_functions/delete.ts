import { constructAPIResponse } from "@/app/api/_utils"
import { handleApiError } from "@/lib/errors"
import { deleteMedia } from "@/lib/media/delete"
import { ICollectionsWithMediaNames } from "@/types/media"

export const deleteAssociatedMedia = async ({
    formData
} : {
    formData: FormData
}) => {

    const mediaId = formData.get('currentMediumId') as string

    if (!mediaId) throw new Error('No media id found.')

    const result = await deleteMedia({ mediaId }) // TO DO: ON DELETE CASCADE

    if (result.error) return handleApiError({
        ...result
    })

    return Response.json(
        constructAPIResponse({
            message: 'Elementos asociados correctamente.',
            error: null,
            success: true,
            data: result.data
        })
    )
}