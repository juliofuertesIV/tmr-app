import { IContestMediaRole, IOneOfCollectionNames } from "@/types";
import { createAndAssociateMediaToCollection, prepareAndValidateMediaFile, uploadToGoogleCloudStorage } from "../_utils/media";
import { sequelize } from "@/database";
import { constructAPIResponse } from "@/app/api/_utils";
import { handleApiError } from "@/app/api/_utils/errors";

type IMediaPayload = {
    media: File,
    role: IContestMediaRole | 'inscription',
    type: 'single' | 'multiple',
    width: string,
    height: string
}

type IMediaCreationPayload = {
    role: IContestMediaRole | 'inscription',
    width: string,
    height: string
}

type IValidationOutcome = {
    bytes: ArrayBuffer,
    mediaCreationPayload: IMediaCreationPayload,
    filename: string,
    sizeError: Error | null
}

export const POST = async (req: Request, { params } : { params: { id: string | number, collection: IOneOfCollectionNames }}) => {

    const { collection, id } = params

    const payload = Object.fromEntries(await req.formData()) as IMediaPayload

    const { bytes, mediaCreationPayload, filename, sizeError } = await prepareAndValidateMediaFile(payload, collection)
    
    const { type } = payload

    if (type === 'multiple') {
        return Response.json(
            constructAPIResponse({ 
                message: 'Multiple files not yet supported.',
                success: false,
                error: new Error('Todavía no podemos subir imágenes múltiples.'),
                data: null 
            })
        )
    }

    if (sizeError) {        
        return Response.json(
            constructAPIResponse({ 
                message: sizeError.message,
                success: false,
                error: sizeError,
                data: null 
            })
        )
    }

    try {
        await uploadToGoogleCloudStorage({ bytes, collectionOrDomain: collection, filename })
    }
    catch (error) {

        await handleApiError({
            error,
            collection,
            route: `/api/${ collection }/${ id }/media`,
            message: 'Error subiendo el blob de imagen.'
        })
    }

    const transaction = await sequelize.transaction()
    
    try {
        const relationship = await createAndAssociateMediaToCollection({ 
            collection,
            payload: mediaCreationPayload,
            transaction,
            id 
        });

        await transaction.commit();

        return Response.json({ 
            message: "Imagen asociada correctamente al concurso.",
            success: true,
            error: null,
            data: relationship
        })
    }
    catch (error) {
        await handleApiError({
            error,
            collection,
            route: `/api/${ collection }/${ id }/media`,
            message: "Ha habido un problema asociando la imagen al concurso.",
            transaction
        })
    }
}