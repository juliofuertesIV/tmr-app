import { IContestMedia, IOneOfCollectionNames } from "@/interfaces";
import { getAssociationPayload, getFilesizeLimitInBytes, getModelAndAssociationTableByCollectionName, produceFileName, uploadToGoogleCloudStorage } from "./_utils";
import { sequelize } from "@/database";
import { Transaction } from "sequelize";


export const POST = async (req: Request, { params } : { params: { id: string | number, collection: IOneOfCollectionNames }}) => {

    const { collection, id } = params 

    /* TO DO: VALIDATE COLLECTION NAME, PARAMS, FILE BYTE LENGTH, ETC */

    const payload = Object.fromEntries(await req.formData()) as { media: File, mediaType: 'logo' | 'footerElement' | 'banner' }

    const { media, mediaType } = payload

    const filename = produceFileName(media.name)

    const publicUrl = `https://storage.googleapis.com/${process.env.GCP_BUCKET}/${ collection }/${ filename }`

    const mediaCreationPayload = { type: mediaType, src: publicUrl }

    const bytes = await media.arrayBuffer();
    
    console.log({ bytes: bytes.byteLength });

    try {
        await uploadToGoogleCloudStorage({ bytes, collection, filename })
    }
    catch (error) {
        return Response.json({
            message: 'Error subiendo el blob de imagen',
            success: false,
            error,
            data: null
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
        console.log({ error })
        await transaction.rollback();
        return Response.json({ 
            message: "Ha habido un problema asociando la imagen al concurso.",
            success: false,
            error,
            data: null 
        })
    }
}

async function createAndAssociateMediaToCollection({ collection, payload, transaction, id } : { 
    collection: IOneOfCollectionNames,
    payload: { type: string, src: string },
    transaction: Transaction,
    id: string | number 
}) {

    const { Model, AssociationTable } = getModelAndAssociationTableByCollectionName(collection);

    const insertedImage = await Model.create({ ...payload }, { transaction }) as unknown as IContestMedia;

    const associationPayload = getAssociationPayload('contests', id, insertedImage.id);

    const relationship = await AssociationTable.create({ ...associationPayload }, { transaction });

    return relationship;
}
