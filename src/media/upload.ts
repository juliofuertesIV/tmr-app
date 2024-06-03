import { handleApiError } from "@/app/api/_utils/errors"
import { IOneOfCollectionsWithMediaNames } from "@/types"
import { prepareMediaFile } from "./preparation"
import { uploadToGoogleCloudStorage } from "@/lib/gcp_storage"
import { IMediaPayload, IMediaRole } from "@/types/media"

type Props = {
    collection: IOneOfCollectionsWithMediaNames,
    domain: string,
    payload: IMediaPayload
}

export const uploadMedia = async ({ 
    collection,
    domain,
    payload 
} : Props
) : Promise<{
    width: string,
    height: string,
    role: IMediaRole,
    src: string
}> => {

    const { width, height, role } = payload

    const { 
        success,
        error,
        bytes,
        filename,
        src 
    } = await prepareMediaFile({ payload, domain, collection })

    if (!success) {
        handleApiError({
            collection: collection,
            route: '/api/' + collection,
            error,
            message: 'Error validando la imagen.' 
        })
    }

    await uploadToGoogleCloudStorage({ 
        bytes,
        filename,
        collection,
        domain 
    })
    .catch(error => {
        handleApiError({
            collection: collection,
            route: '/api/' + collection,
            error,
            message: 'Error al subir el archivo de imagen.' 
        })
    })

    return { width, height, role, src }
}