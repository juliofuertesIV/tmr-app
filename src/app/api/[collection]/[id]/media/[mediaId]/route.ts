import { IContestMedia, IOneOfCollectionNames } from "@/interfaces";
import { constructAPIResponse } from "@/app/api/_utils";
import { ContestMedia, sequelize } from "@/database";
import { Storage } from "@google-cloud/storage";
import { bucketName } from "../_utils";

type Params = {
    id: string,
    mediaId: string,
    collection: IOneOfCollectionNames
}

export const DELETE = async (req: Request, { params } : { params: Params }) => {

    const { collection, id, mediaId } = params

    const media = await ContestMedia.findOne({ where: { id: mediaId }})
    .then(data => data as unknown as IContestMedia) 
    .catch(err => {
        return Response.json(
            constructAPIResponse({ 
                message: 'Error recuperando la imagen de la base de datos.',
                success: false,
                error: err,
                data: null
            })
        )
    })

    const transaction = await sequelize.transaction()

    try {
        await ContestMedia.destroy({ where: { id: mediaId }, transaction })
    } catch (error) {
        return Response.json(
            constructAPIResponse({
                message: 'Error eliminando la imagen de la base de datos.',
                success: false,
                error,
                data: null
            })
        )
    }

    try {
        await deleteFromCloudStorage({ src: (media as IContestMedia).src })
    } 
    catch (error) {
        await transaction.rollback()
        return Response.json(
            constructAPIResponse({
                message: 'Error eliminando la imagen de Cloud Storage',
                success: true,
                error,
                data: null
            })
        )
    }

    await transaction.commit()

    return Response.json(
        constructAPIResponse({
            message: 'OK',
            success: true,
            error: null,
            data: null
        })
    )
}

const deleteFromCloudStorage = async ({ src } : { src: string }) => {

    console.log('TRYING TO DELETE FROM STORAGE')

    const fileName = src.replace('https://storage.googleapis.com/concursos_tmr_media/', '')

    const storage = new Storage({
        projectId: process.env.PROJECT_ID,
        credentials: {
            client_email: process.env.CLIENT_EMAIL,
            private_key: process.env.GCP_PRIVATE_KEY
        }
    });

    const res = await storage.bucket(bucketName).file(fileName).delete()
    console.log({ res })
}