import { handleApiError } from "@/lib/errors"
import { deleteMediaInStorageAndDatabase } from "@/lib/media/delete"

export const deleteMedia = async ({ formData } : { formData: FormData }) => {

    const mediaId = formData.get('currentMediumId') as string

    if (!mediaId) throw new Error('No media id found.')

    try {
        await deleteMediaInStorageAndDatabase({ MediumId: mediaId }) // TO DO: ON DELETE CASCADE
    } catch (error) {

        return await handleApiError({
            error,
            route: 'media/functions/delete'
        })
    }

}