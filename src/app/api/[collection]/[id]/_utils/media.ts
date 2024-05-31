import { IMedia, IContestMediaRole, IOneOfCollectionNames } from "@/types";
import { Transaction } from "sequelize";
import { Media, ContestMedia } from "@/database";
import { Model, ModelStatic, Options } from "sequelize";
import path from "path";
import { Storage } from "@google-cloud/storage";


type IMediaPayload = {
    media: File,
    role: IContestMediaRole | 'inscription',
    type: 'single' | 'multiple',
    width: string,
    height: string
}

type IMediaCreationPayload = {
    role: IContestMediaRole | 'inscription',
    width: number,
    height: number,
}

type IInscriptionValidationOutcome = {
    bytes: ArrayBuffer,
    filename: string,
    src: string,
    sizeError: Error | null
}


type IValidationOutcome = {
    bytes: ArrayBuffer,
    mediaCreationPayload: IMediaCreationPayload,
    filename: string,
    sizeError: Error | null
}

export const modelsByCollectionName = {
    contests: {
        Model: Media,
        AssociationTable: ContestMedia,
        options: {}
    }
} as { 
    [key in IOneOfCollectionNames]: { 
        Model: ModelStatic<Model<any, any>>,
        AssociationTable: ModelStatic<Model<any, any>>,
        options: Options
    }
}

export const getModelAndAssociationTableByCollectionName = (collection: IOneOfCollectionNames) => modelsByCollectionName[collection]

export const produceFileName = (fileName: string) => crypto.randomUUID() + "-" + new Date().getTime() + path.extname(fileName);

export const bucketName = process.env.GCP_BUCKET as string

export const limitInMegaBytes = 2

export const getFilesizeLimitInBytes = (mbNumber: number) => 1024 * 1024 * mbNumber

export const manageMediaFiles = () => {
    
}

export async function uploadToGoogleCloudStorage({ bytes, collectionOrDomain, filename } : { bytes: ArrayBuffer, collectionOrDomain: string, filename: string }) {
    
    const buffer = Buffer.from(bytes)
    
    const storage = new Storage({
        projectId: process.env.PROJECT_ID,
        credentials: {
            client_email: process.env.CLIENT_EMAIL,
            private_key: process.env.GCP_PRIVATE_KEY
        }
    });

    const bucket = storage.bucket(bucketName);

    await new Promise((resolve, reject) => {

        const blob = bucket.file(`${collectionOrDomain}/${filename}`)
        const blobStream = blob.createWriteStream({ resumable: false })

        blobStream
            .on("error", (err) => reject(err))
            .on("finish", () => resolve(true));

        blobStream.end(buffer);
    })
}

export const getAssociationPayload = (
    collection: 'contests' | 'inscriptions',
    collectionElementId: string | number,
    mediaElementId: string | number) => { 

    if (collection === 'contests') return { 
        ContestId: collectionElementId,
        MediumId: mediaElementId 
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


export const mediaPayloadIsValidLength = ({ bytes } : { bytes: ArrayBuffer }) => {
    
    const byteLimit = getFilesizeLimitInBytes(parseInt(process.env.MAX_FILE_SIZE as string))

    return bytes.byteLength < byteLimit;
}


export const validateInscriptionMedia = async ({ file, domain } : { file: File, domain: string }) : Promise<IInscriptionValidationOutcome> => {

    const bytes = await file.arrayBuffer();

    const sizeError = mediaPayloadIsValidLength({ bytes }) ? null : new Error('La imagen es demasiado grande')
    
    const filename = produceFileName(file.name)

    const publicUrl = `https://storage.googleapis.com/${process.env.GCP_BUCKET}/${ domain }/${ filename }`

    return { bytes, filename, src: publicUrl, sizeError }
}



export const prepareAndValidateMediaFile = async (payload: IMediaPayload, collection: IOneOfCollectionNames | 'inscriptions') : Promise<IValidationOutcome> => {

    const { media, width, height, role } = payload

    const bytes = await media.arrayBuffer();

    const sizeError = mediaPayloadIsValidLength({ bytes }) ? null : new Error('La imagen es demasiado grande')
    
    const filename = produceFileName(media.name)

    const publicUrl = `https://storage.googleapis.com/${process.env.GCP_BUCKET}/${ collection }/${ filename }`

    const mediaCreationPayload = { 
        role, 
        src: publicUrl,
        width: parseInt(width),
        height: parseInt(height),
        alt: 'Media belonging to a TMR contest.'
    }

    return { bytes, filename, mediaCreationPayload, sizeError }
}


export const createAndAssociateMediaToCollection = async ({ collection, payload, transaction, id } : { 
    collection: IOneOfCollectionNames,
    payload: IMediaCreationPayload,
    transaction: Transaction,
    id: string | number 
}) => {

    const { Model, AssociationTable } = getModelAndAssociationTableByCollectionName(collection);

    const insertedImage = await Model.create({ ...payload }, { transaction }) as unknown as IMedia;

    const associationPayload = getAssociationPayload('contests', id, insertedImage.id);

    const relationship = await AssociationTable.create({ ...associationPayload }, { transaction });

    return relationship;
}


export const deleteFromCloudStorage = async ({ src } : { src: string }) => {

    const fileName = src.replace('https://storage.googleapis.com/concursos_tmr_media/', '')

    const storage = new Storage({
        projectId: process.env.PROJECT_ID,
        credentials: {
            client_email: process.env.CLIENT_EMAIL,
            private_key: process.env.GCP_PRIVATE_KEY
        }
    });

    await storage.bucket(bucketName).file(fileName).delete()
}
