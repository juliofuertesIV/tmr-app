import { Media, sequelize } from "@/database"
import { uploadMedia } from "@/media/upload"
import { ICollectionsWithMediaNames } from "@/types"
import { handleApiError } from "@/app/api/_utils/errors"
import { deleteFromCloudStorage } from "@/lib/gcp_storage"
import { IMedia, IMediaPayload } from "@/types/media"

export const CreateMedia = async ({ 
    formData,
    collection,
    domain
} : { 
    formData: FormData,
    domain: string,
    collection: ICollectionsWithMediaNames 
}
) : Promise<{ MediumId: string | null }> => {

    if (!formData.has('file')) return { MediumId: null }

    const payload = Object.fromEntries(formData) as IMediaPayload

    const { src, width, height, role } = await uploadMedia({ collection, domain, payload }) 

    const transaction = await sequelize.transaction()

    try {
        const image = await Media.create({
            role,
            src,
            width,
            height,
            alt: 'Media for TMR contest.'
        }, { 
            transaction 
        }).then(data => data) as unknown as IMedia

        return { MediumId: image.id } 
    }
    catch (error) {
        await deleteFromCloudStorage({ src })
        await handleApiError({
            transaction,
            collection: 'inscriptions',
            route: '/api/inscriptions',
            error,
            message: 'Fallo guardando el contenido multimedia en la DB.' 
        })
        return { MediumId: null }
    }
}