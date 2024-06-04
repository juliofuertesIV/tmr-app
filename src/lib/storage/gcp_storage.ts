import { Storage } from "@google-cloud/storage";

const bucketName = process.env.GCP_BUCKET as string

export async function uploadToGoogleCloudStorage({ 
    bytes,
    collection,
    domain,
    filename 
} : { 
    bytes: ArrayBuffer,
    collection: string,
    domain: string,
    filename: string 
}) {
    
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

        const blob = bucket.file(`${ domain }/${ collection }/${filename}`)
        const blobStream = blob.createWriteStream({ resumable: false })

        blobStream
            .on("error", (err) => { return reject(err) })
            .on("finish", () => { return resolve(true) });

        blobStream.end(buffer);
    })
    .then(() => true)
    .catch(error => error)
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
