
import { Inscription, Media, sequelize } from '@/database'
import { IMedia, IOneOfCollectionNames } from '@/types'
import { getModelByCollectionName } from './_utils'
import { constructAPIResponse } from '../_utils'
import { handleApiError, logError } from '../_utils/errors'
import { uploadToGoogleCloudStorage, validateInscriptionMedia } from './[id]/_utils/media'
import { ICreateInscriptionPayload } from '@/types/inscriptions'

export const GET = async (req: Request, { params } : { params: { collection: IOneOfCollectionNames }}) => {

    const { collection } = params
    const { Model, options } = getModelByCollectionName(collection)

    const data = await Model.findAll({ ...options }).then(data => data)

    console.log({ data })

    return Response.json(
        constructAPIResponse({ 
            message: 'OK!',
            success: true,
            error: null,
            data 
        })
    )

}

export const POST = async (req: Request, { params } : { params: { collection: IOneOfCollectionNames }}) => {

    const { collection } = params

    const formData = await req.formData()

    if (collection === 'inscriptions') {

        try {
            return await ManageContestInscription(formData)
        }
        catch (error) {
            return await handleApiError({
                error,
                message: 'Error inscribiendo candidatura',
                route: '/api/inscriptions',
                collection: 'inscriptions'
            })
        }
    }

    const { Model } = getModelByCollectionName(collection)

    const payload = Object.fromEntries(formData)
    const transaction = await sequelize.transaction()

    try {
        const data = await Model.create({ ...payload }, { transaction })
        await transaction.commit()
        return Response.json(
            constructAPIResponse({ 
                message: "Elemento creado correctamente.",
                success: true,
                error: null,
                data 
            })
        )
    }
    catch (error) {
        await transaction.rollback();

        await logError({ 
            error, 
            collection,
            route: `/api/${ collection }`
        })

        return Response.json(
            constructAPIResponse({ 
                message: "Ha habido un problema creando el elemento.",
                success: false,
                error,
                data: null 
            })
        )
    }
}

const ManageContestInscription = async (formData: FormData) => {
    
    const payload = Object.fromEntries(formData) as ICreateInscriptionPayload

    console.log({ payload })

    if (!payload.image) {
        handleApiError({
            collection: 'inscriptions',
            route: '/api/inscriptions',
            error: new Error('No hay imagen en la inscripción.'),
            message: 'Fallo inscribiendo candidatura.' 
        })
    }

    const { bytes, filename, src, sizeError } = await validateInscriptionMedia({ file: payload.image, domain: payload.domain })

    if (sizeError) (
        handleApiError({
            collection: 'inscriptions',
            route: '/api/inscriptions',
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
            route: '/api/inscriptions',
            error,
            message: 'Error al subir el archivo de imagen.' 
        })
    }
    
    const transaction = await sequelize.transaction()

    try {
        const image = await Media.create({
            role: 'inscription',
            src,
            width: 500,
            height: 500,
            alt: 'Media for TMR contest.'
        }, { transaction }).then(data => data) as unknown as IMedia

        const inscription = await Inscription.create({ 
            MediumId: image.id,
            ...payload 
        }, { transaction })
        
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
        return await handleApiError({
            transaction,
            collection: 'inscriptions',
            route: '/api/inscriptions',
            error,
            message: 'Fallo inscribiendo candidatura.' 
        })
    }
}