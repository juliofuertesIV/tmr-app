import { Media, sequelize } from "@/lib/database"
import { uploadMedia } from "@/lib/media/upload"
import { ICollectionsWithMediaNames } from "@/lib/types"
import { handleApiError } from "@/lib/errors"
import { deleteFromCloudStorage } from "@/lib/gcp_storage"
import { IMedia, IMediaPayload } from "@/lib/types/media"

export const createMedia = async ({ 
    formData,
    collection,
} : { 
    formData: FormData,
    collection: ICollectionsWithMediaNames 
}
) : Promise<{ MediumId: string | null }> => {

    if (!formData.has('file')) return { MediumId: null }

    const payload = Object.fromEntries(formData) as IMediaPayload

    const domain = formData.get('domain') as string

    if (!domain) {
        await handleApiError({
            route: 'create-media',
            error: new Error('No hay domain en la formData.'),
            message: 'Ausencia de domain.' 
        })
        return { MediumId: null }
    }

    const { src, width, height, role } = await uploadMedia({ 
        collection,
        domain,
        payload 
    }) 

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