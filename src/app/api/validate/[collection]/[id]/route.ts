import { getModelByCollectionName } from "@/app/api/protected/contests/[id]/[association]/_utils"
import { constructAPIResponse } from "@/app/api/_functions"
import { IContest, ICollectionNames } from "@/types"

export const GET = async (req: Request, { params } : { params: { collection: ICollectionNames, id: string }}) => {

    const { id, collection } = params

    if (collection !== 'contests') {
        return Response.json(
            constructAPIResponse({ 
                message: 'Failed to validate',
                success: false,
                error: new Error('La validación solo está implementada para concursos.'),
                data: null 
            })
        )
    }

    
    const contest = await getCollectionItem({ collection, id }) as unknown as IContest

    if (!contest) {
        return returnContestNotValid(new Error('No se ha encontrado el concurso.'))
    }
    
    try {
        validateContest(contest)
    }
    catch (error) {
        return returnContestNotValid(error)
    }

    return Response.json(
        constructAPIResponse({ 
            message: 'El concurso puede cambiar de estado.',
            success: true,
            error: null,
            data: null
        })
    )
}

const validateContest = (contest : IContest) => {
    
    findBrandError(contest)
    findMediaError(contest)
    findBasicInfoError(contest)

}

const returnContestNotValid = (error: unknown) => {
    return Response.json(
        constructAPIResponse({ 
            message: 'El concurso no está preparado para cambiar de estado.',
            success: false,
            error,
            data: null 
        })
    )
}



const findBasicInfoError = (contest: IContest) => {

    const fieldsToTest = [
        'domain',
        'metaUrl',
        'metaTitle',
        'metaDescription',
        'postmarkSenderAddress',
        'postmarkToken',
        'googleTagManagerId',
        'googleAnalyticsId',
        'year'
    ] as (keyof IContest)[]

    const errors = fieldsToTest.filter(field => contest[field] === null)

    if (errors.length) {
        throw new Error(`Faltan ${ errors.length } campos de información del concurso por rellenar: ${ errors.join(', ')}.`)
    }
}

const findBrandError = (contest: IContest) => {
    if (!contest.BrandId) {
        throw new Error('El concurso no está asociado a ninguna marca.')
    }   
}

const findMediaError = (contest: IContest) => {

    if (contest.Media.length < 4) {
        throw new Error('El concurso no tiene alguna de las imágenes requeridas (logo, favicon, marco, banner).')
    }
}


const getCollectionItem = async ({ collection, id } : { collection: ICollectionNames, id: string }) => {

    const { Model, options } = getModelByCollectionName(collection)
    
    const collectionItem = await Model.findOne({ where: { id }, ...options })
    .then(data => data)
    .catch(error => { throw new Error(error) })

    return collectionItem
}