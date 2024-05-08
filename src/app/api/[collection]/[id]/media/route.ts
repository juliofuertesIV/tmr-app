import { IContestMedia, IContestMediaRole, IOneOfCollectionNames } from "@/interfaces";
import { getAssociationPayload, getFilesizeLimitInBytes, getModelAndAssociationTableByCollectionName, mediaPayloadIsValidLength, produceFileName, uploadToGoogleCloudStorage } from "./_utils";
import { sequelize } from "@/database";
import { Transaction } from "sequelize";
import { constructAPIResponse } from "@/app/api/_utils";

type IMediaPayload = {
    media: File,
    role: IContestMediaRole | 'inscription',
    width: string,
    height: string
}

type IMediaCreationPayload = {
    role: IContestMediaRole | 'inscription',
    width: string,
    height: string
}

export const POST = async (req: Request, { params } : { params: { id: string | number, collection: IOneOfCollectionNames }}) => {

    const { collection, id } = params

    const payload = Object.fromEntries(await req.formData()) as IMediaPayload

    const { bytes, mediaCreationPayload, filename, validationError } = await prepareAndValidateMediaFile(payload, collection)
    
    if (validationError) {
        return Response.json(
            constructAPIResponse({ 
                message: validationError.message,
                success: false,
                error: validationError,
                data: null 
            })
        )
    }

    try {
        await uploadToGoogleCloudStorage({ bytes, collection, filename })
    }
    catch (error) {
        return Response.json(
            constructAPIResponse({
                message: 'Error subiendo el blob de imagen',
                success: false,
                error,
                data: null
            })
        )
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
        await transaction.rollback();
        return Response.json(
            constructAPIResponse({ 
                message: "Ha habido un problema asociando la imagen al concurso.",
                success: false,
                error,
                data: null 
            })
        )
    }
}

const prepareAndValidateMediaFile = async (payload: IMediaPayload, collection: IOneOfCollectionNames) => {

    const { media, width, height, role } = payload

    const bytes = await media.arrayBuffer();

    const validationError = mediaPayloadIsValidLength({ bytes }) ? null : new Error('La imagen es demasiado grande')
    
    const filename = produceFileName(media.name)

    const publicUrl = `https://storage.googleapis.com/${process.env.GCP_BUCKET}/${ collection }/${ filename }`

    const mediaCreationPayload = { 
        role, 
        src: publicUrl,
        width,
        height,
        alt: 'Media belonging to a TMR contest.'
    }

    return { bytes, filename, mediaCreationPayload, validationError }
}


async function createAndAssociateMediaToCollection({ collection, payload, transaction, id } : { 
    collection: IOneOfCollectionNames,
    payload: IMediaCreationPayload,
    transaction: Transaction,
    id: string | number 
}) {

    const { Model, AssociationTable } = getModelAndAssociationTableByCollectionName(collection);

    const insertedImage = await Model.create({ ...payload }, { transaction }) as unknown as IContestMedia;

    const associationPayload = getAssociationPayload('contests', id, insertedImage.id);

    const relationship = await AssociationTable.create({ ...associationPayload }, { transaction });

    return relationship;
}