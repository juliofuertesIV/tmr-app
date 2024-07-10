import { Document, Media, sequelize } from "@/lib/database"
import { uploadDocument, uploadMedia } from "@/lib/media/upload"
import { handleApiError } from "@/lib/errors"
import { IDocument, IMedia, IMediaPayload } from "@/types/media"
import { ICollectionsWithMediaNames } from "@/types/media"
import { deleteFromCloudStorage } from "../storage/gcp_storage"
import { Transaction } from "sequelize"

export const createDocument = async ({
    formData,
    collection,
} : { 
    formData: FormData,
    collection: ICollectionsWithMediaNames
}) => {

    const file = formData.get('file') as File
    const domain = formData.get('domain') as string

    const response = await uploadDocument({ domain, file })
    .catch(async (error) => {
        return await handleApiError({
            collection,
            route: '/api/' + collection,
            error,
            message: 'Fallo validando el archivo.' 
        })
    }) as { filename: string, src: string }

    const { filename, src } = response

    const transaction = await sequelize.transaction()

    try {
        const document = Document.create({ role: filename, src }, { transaction })
        .then(data => data) as unknown as IDocument

        return { DocumentId: document.id, transaction }

    } catch (error) {
        await deleteFromCloudStorage({ src })
        await handleApiError({
            transaction,
            collection: 'inscriptions',
            route: '/api/inscriptions',
            error,
            message: 'Fallo guardando el archivo en la DB.' 
        })
        return { DocumentId: null, transaction }
    }
    
}

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