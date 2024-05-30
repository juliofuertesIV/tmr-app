import { Inscription, Media, sequelize } from "@/database"
import { handleApiError } from "../_utils/errors"
import { constructAPIResponse } from "../_utils"
import { ICreateInscriptionPayload } from "@/types/inscriptions"
import { uploadToGoogleCloudStorage, validateInscriptionMedia } from "../[collection]/[id]/_utils/media"

export const POST = async (req: Request) => {

    const formData = await req.formData()
    
    const payload = Object.fromEntries(formData) as ICreateInscriptionPayload

    const { bytes, filename, src, sizeError } = await validateInscriptionMedia({ file: payload.media, domain: '' })

    if (sizeError) (
        handleApiError({
            collection: 'inscriptions',
            route: '/api/apply',
            error: new Error('La imagen es demasiado grande'),
            message: 'Fallo inscribiendo candidatura.' 
        })
    )

    try {
        await uploadToGoogleCloudStorage({ bytes, collectionOrDomain: payload.domain, filename })
    }
    catch (error) {
        handleApiError({
            collection: 'inscriptions',
            route: '/api/apply',
            error,
            message: 'Error al subir el archivo de imagen a GCP.' 
        })
    }
    
    const transaction = await sequelize.transaction()

    try {
        const inscription = await Inscription.create({ 
            image: src,
            ...payload 
        }, { transaction })

        const image = await Media.create({
            role: 'inscription',
            src,
            width: 500,
            height: 500,
            alt: 'Media for TMR contest.'
        })

        
        await transaction.commit()

        return Response.json(
            constructAPIResponse({ 
                message: "Candidatura inscrita correctamente.",
                success: true,
                error: null,
                data: { inscription, image } 
            })
        )
    }
    catch (error) {
        handleApiError({
            transaction,
            collection: 'inscriptions',
            route: '/api/apply',
            error,
            message: 'Fallo inscribiendo candidatura.' 
        })
    }
}