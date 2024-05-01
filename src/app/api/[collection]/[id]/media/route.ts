import { IContestMedia, IOneOfCollectionNames } from "@/interfaces";
import { Storage } from "@google-cloud/storage";
import { bucketName, getFilesizeLimitInBytes, getModelAndAssociationTableByCollectionName, limitInMegaBytes, produceFileName } from "./_utils";
import { sequelize } from "@/database";
import { Transaction } from "sequelize";

const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    credentials: {
        client_email: process.env.CLIENT_EMAIL,
        private_key: process.env.GCP_PRIVATE_KEY
    }
});

const bucket = storage.bucket(bucketName);

export const POST = async (
    req: Request, { params } : { params: { id: string | number, collection: IOneOfCollectionNames }
}) => {

    const { collection, id } = params 

    /* TO DO: VALIDATE COLLECTION NAME, PARAMS, FILE BYTE LENGTH, ETC */

    const payload = Object.fromEntries(await req.formData()) as { media: File, mediaType: 'logo' | 'footerElement' | 'banner' | 'inscription' }

    const { media, mediaType } = payload

    const filename = produceFileName(media.name)

    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${ collection }/${ filename }`

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

async function uploadToGoogleCloudStorage({ bytes, collection, filename } : { bytes: ArrayBuffer, collection: string, filename: string }) {
    
    const buffer = Buffer.from(bytes)

    await new Promise((resolve, reject) => {

        const blob = bucket.file(`${collection}/${filename}`)
        const blobStream = blob.createWriteStream({ resumable: false })

        blobStream
            .on("error", (err) => reject(err))
            .on("finish", () => resolve(true));

        blobStream.end(buffer);
    })
}

const getAssociationPayload = (
    collection: 'contests' | 'inscriptions',
    collectionElementId: string | number,
    mediaElementId: string | number) => { 

        if (collection === 'contests') return { 
            ContestId: collectionElementId,
            ContestMediumId: mediaElementId 
        }
        else {
            return Response.json({ 
                message: 'No payload. La creación de inscription media no está implementada.',
                success: false,
                error: new Error('Too soon!'),
                data: null 
            })            
        }
}