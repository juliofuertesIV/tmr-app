import { Storage } from "@google-cloud/storage";

const bucketName = process.env.GCP_BUCKET as string

export async function uploadToGoogleCloudStorage({ 
    bytes,
    folder,
    filename 
} : { 
    bytes: ArrayBuffer,
    folder: string,
    filename: string 
}) {
    
    const buffer = Buffer.from(bytes)
    
    const storage = new Storage({
        projectId: process.env.GCP_PROJECT_ID,
        credentials: {
            client_email: process.env.GCP_CLIENT_EMAIL,
            private_key: process.env.GCP_PRIVATE_KEY
        }
    });

    const bucket = storage.bucket(bucketName);

    await new Promise((resolve, reject) => {

        const blob = bucket.file(`${ folder }/${filename}`)
        const blobStream = blob.createWriteStream({ resumable: false })

        blobStream
            .on("error", (err) => { return reject(err) })
            .on("finish", () => { return resolve(true) });

        blobStream.end(buffer);
    })
    .then(() => true)
    .catch(error => error)
}

export const deleteFromCloudStorage = async ({ folder, filename } : { folder: string, filename: string }) => {

    const storage = new Storage({
        projectId: process.env.GCP_PROJECT_ID,
        credentials: {
            client_email: process.env.GCP_CLIENT_EMAIL,
            private_key: process.env.GCP_PRIVATE_KEY
        }
    });

    try {
        await storage.bucket(bucketName).file(`${ folder }/${ filename }`).delete()
    }
    catch (error) {
        throw new Error(error as string)
    }
}
