import { handleApiError } from "@/lib/errors"
import { prepareFile, prepareMediaFile } from "./preparation"
import { IMediaPayload, IMediaRole } from "@/types/media"
import { uploadToGoogleCloudStorage } from "@/lib/storage/gcp_storage"
import { ICollectionsWithMediaNames } from "@/types/media"

type Props = {
    collection: ICollectionsWithMediaNames,
    domain: string,
    payload: IMediaPayload
}

export const uploadDocument = async ({
    domain,
    file
} : {
    domain: string,
    file: File
}) => {

    const { bytes, filename, src, success, error } = await prepareFile({ file, collection: 'contests', domain })

    if (!success) {
        await handleApiError({
            collection: 'contests',
            route: '/api/contests',
            error,
            message: 'Error validando la imagen.' 
        })
    }

    await uploadToGoogleCloudStorage({ bytes, domain, filename, collection: 'contests' })
    .catch(async (error) => {
        return await handleApiError({
            collection: 'contests',
            route: '/api/contests',
            error,
            message: 'Error al subir el documento.' 
        })
    })

    return { filename, src }
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
        await handleApiError({
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
    .catch(async (error) => {
        return await handleApiError({
            collection: collection,
            route: '/api/' + collection,
            error,
            message: 'Error al subir el archivo de imagen.' 
        })
    })

    return { width, height, role, src }
}