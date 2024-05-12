import { Media, ContestMedia } from "@/database";
import { IOneOfCollectionNames } from "@/interfaces";
import { Model, ModelStatic, Options } from "sequelize";
import path from "path";
import { Storage } from "@google-cloud/storage";

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

export async function uploadToGoogleCloudStorage({ bytes, collection, filename } : { bytes: ArrayBuffer, collection: string, filename: string }) {
    
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

        const blob = bucket.file(`${collection}/${filename}`)
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