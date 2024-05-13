import { constructAPIResponse } from "@/app/api/_utils"
import { getModelByCollectionName } from "../../_utils"
import { IContest, IOneOfCollectionNames } from "@/interfaces"

export const GET = async (req: Request, { params } : { params: { collection: IOneOfCollectionNames, id: string | number }}) => {

    const { id, collection } = params

    const { Model, options } = getModelByCollectionName(collection)

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
    
    const contest = await Model.findOne({ where: { id }, ...options })
    .then(data => data)
    .catch(error => {
        return Response.json(
            constructAPIResponse({ 
                message: 'Fallo encontrando el concurso',
                success: false,
                error,
                data: null 
            })
        )
    }) as unknown as IContest

    try {
        validateContest(contest)
    }
    catch (error) {
        return Response.json(
            constructAPIResponse({ 
                message: 'Fallo validando el concurso',
                success: false,
                error,
                data: null 
            })
        )
    }


    return Response.json(
        constructAPIResponse({ 
            message: 'OK',
            success: true,
            error: null,
            data: { message: 'El concurso es válido.' }
        })
    )
    
}

const validateContest = (contest : IContest) => {

    return findBasicInfoError(contest)

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


    const errors = fieldsToTest.filter(field => contest[field] === null).map((field) => `El campo ${ field } está vacío.`)

    if (errors.length) {
        throw new Error(errors.join(' '))
    }
}