import { IOneOfCollectionNames } from "@/interfaces";
import { Storage } from "@google-cloud/storage";
import { bucketName, getFilesizeLimitInBytes, getModelByCollectionName, limitInMegaBytes, produceFileName } from "./_utils";

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
    const { Model, AssociationTable } = getModelByCollectionName(collection)

    /* TO DO: VALIDATE FILE BYTE LENGTH ETC */

    const payload = Object.fromEntries(await req.formData()) as { [k: string]: File }

    const { logo } = payload

    const filename = produceFileName(logo.name)

    const bytes = await logo.arrayBuffer();
    
    try {

        const buffer = Buffer.from(bytes);

        console.log({ bytes: bytes.byteLength })

        await new Promise((resolve, reject) => {

            const blob = bucket.file(`${ collection }/${ filename }`);

            const blobStream = blob.createWriteStream({
                resumable: false,
            });
        
            blobStream
            .on("error", (err) => reject(err))
            .on("finish", () => resolve(true));
        
            blobStream.end(buffer);
        });
        
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${ collection }/${ filename }`

        return Response.json({ 
            message: "Imagen asociada correctamente al concurso.",
            success: true,
            error: null,
            data: publicUrl
        })
    }
    catch (error) {
        console.log({ error })
        return Response.json({
            message: 'Error subiendo el blob de imagen',
            success: false,
            error,
            data: null
        })
    }

    /* 
    
    const transaction = await sequelize.transaction()

    try {
        const data = await Model.create({ ...payload }, { transaction })
        await transaction.commit()
        return Response.json({ 
            message: "Imagen asociada correctamente al concurso.",
            success: true,
            error: null,
            data 
        })
    }
    catch (error) {
        await transaction.rollback();
        return Response.json({ 
            message: "Ha habido un problema asociando la imagen al concurso.",
            success: false,
            error,
            data: null 
        })
    } */
}


