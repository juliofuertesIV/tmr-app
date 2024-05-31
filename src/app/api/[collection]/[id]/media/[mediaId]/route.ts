import { IMedia, IOneOfCollectionNames } from "@/types";
import { constructAPIResponse } from "@/app/api/_utils";
import { Media, sequelize } from "@/database";
import { logError } from "@/app/api/_utils/errors";
import { deleteFromCloudStorage } from "../../_utils/media";

type Params = {
    id: string,
    mediaId: string,
    collection: IOneOfCollectionNames
}

export const DELETE = async (req: Request, { params } : { params: Params }) => {

    const { collection, id, mediaId } = params

    const media = await Media.findOne({ where: { id: mediaId }})
    .then(data => data as unknown as IMedia) 
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
        await Media.destroy({ where: { id: mediaId }, transaction })
    } catch (error) {

        await logError({ 
            error, 
            collection,
            route: `/api/${ collection }/${ id }/media/${ mediaId }`
        })
        
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
        await deleteFromCloudStorage({ src: (media as IMedia).src })
    } 
    catch (error) {
        await transaction.rollback()

        await logError({ 
            error, 
            collection,
            route: `/api/${ collection }/${ id }/media/${ mediaId }`
        })

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
