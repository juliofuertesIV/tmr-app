import { Media, sequelize } from "@/database"
import { uploadMedia } from "@/media/upload"
import { IMedia } from "@/types"
import { handleApiError } from "@/app/api/_utils/errors"
import { deleteFromCloudStorage } from "@/lib/gcp_storage"

export const ManageRequestMedia = async (formData: FormData) : Promise<{ MediumId: string | null }> => {

    const payload = Object.fromEntries(formData) 

    if (!payload.image) {
        return { MediumId: null }
    }

    const {
        src,
        width,
        height,
        role
    } = await uploadMedia({ 
        collection: 'inscriptions',
        domain: payload.domain as string,
        payload: {
            file: payload.image as File,
            width: '500',
            height: '500',
            role: 'inscriptions'
        } 
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
            message: 'Fallo inscribiendo candidatura.' 
        })
        return { MediumId: null }
    }
}