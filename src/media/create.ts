import { Media, sequelize } from "@/database"
import { uploadMedia } from "@/media/upload"
import { IOneOfCollectionsWithMediaNames } from "@/types"
import { handleApiError } from "@/app/api/_utils/errors"
import { deleteFromCloudStorage } from "@/lib/gcp_storage"
import { IMedia, IMediaPayload } from "@/types/media"
import { constructAPIResponse } from "@/app/api/_utils"

export const CreateMedia = async ({ 
    formData,
    collection,
    domain
} : { 
    formData: FormData,
    domain: string,
    collection: IOneOfCollectionsWithMediaNames 
}
) : Promise<{ MediumId: string } | Response> => {

    if (!formData.has('file')) {
        return Response.json(
            constructAPIResponse({
                message: 'No hay imagen en la inscripción.',
                data: null,
                success: false,
                error: new Error('No hay archivo de imagen.')
            })
        )
    }

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

        await transaction.commit()
        
        return { MediumId: image.id } 
    }
    catch (error) {
        await deleteFromCloudStorage({ src })
        return await handleApiError({
            transaction,
            collection: 'inscriptions',
            route: '/api/inscriptions',
            error,
            message: 'Fallo guardando el contenido multimedia en la DB.' 
        })
    }
}