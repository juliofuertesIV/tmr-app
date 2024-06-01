
import { Inscription, sequelize } from '@/database'
import { IOneOfCollectionNames } from '@/types'
import { getModelByCollectionName } from './_utils'
import { constructAPIResponse } from '../_utils'
import { handleApiError, logError } from '../_utils/errors'
import { ICreateInscriptionPayload } from '@/types/inscriptions'
import { ManageRequestMedia } from './_utils/media'

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

    const { MediumId } = await ManageRequestMedia(formData)

    const creationPayload = MediumId ? { MediumId, ...payload } : payload

    try {
        const inscription = await Inscription.create({ ...creationPayload })

        return Response.json(
            constructAPIResponse({ 
                message: "Candidatura inscrita correctamente.",
                success: true,
                error: null,
                data: { inscription } 
            })
        )
    }
    catch (error) {

        await logError({ 
            error, 
            collection: 'inscriptions',
            route: '/api/inscriptions'
        })

        return await handleApiError({
            collection: 'inscriptions',
            route: '/api/inscriptions',
            error,
            message: 'Fallo inscribiendo candidatura.' 
        })
    }
}