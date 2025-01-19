import { Media, sequelize } from '@/database/models'
import { uploadMedia } from "@/lib/media/upload"
import { handleApiError } from "@/lib/errors"
import { IMedia, IMediaPayload } from "@/types/media"
import { ICollectionsWithMediaNames } from "@/types/media"
import { deleteFromCloudStorage } from "../storage/gcp_storage"
import { Transaction } from "sequelize"

export const createMedia = async ({ 
    formData,
    collection,
} : { 
    formData: FormData,
    collection: ICollectionsWithMediaNames
}
) : Promise<{ MediumId: string | null, transaction: Transaction }> => {

    const payload = Object.fromEntries(formData) as IMediaPayload

    const { src, width, height, role } = await uploadMedia({ 
        collection,
        domain: formData.get('domain') as string,
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

        return { MediumId: image.id, transaction } 
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
        return { MediumId: null, transaction }
    }
}