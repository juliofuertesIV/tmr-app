import { handleApiError } from "@/app/api/_utils/errors"
import { IMediaRole, IOneOfCollectionsWithMediaNames } from "@/types"
import { prepareMediaFile } from "./preparation"
import { uploadToGoogleCloudStorage } from "@/lib/gcp_storage"

type Props = {
    collection: IOneOfCollectionsWithMediaNames,
    domain: string,
    payload: {
        file: File,
        height: string,
        width: string,
        role: IMediaRole
    }
}

export type UploadMediaReturnType = {
    width: string,
    height: string,
    role: IMediaRole,
    src: string
}

export const uploadMedia = async ({ collection, domain, payload } : Props) : Promise<UploadMediaReturnType>  => {

    const { width, height, role } = payload

    const data = await prepareMediaFile({ 
        payload,
        domain,
        collection 
    })
    .then((data) => data)
    .catch(error => {
        handleApiError({
            collection: collection,
            route: '/api/' + collection,
            error,
            message: 'Error validando la imagen.' 
        })
    }) as {
        bytes: ArrayBuffer,
        filename: string,
        src: string
    }

    await uploadToGoogleCloudStorage({ 
        bytes: data.bytes,
        filename: data.filename,
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

    const { src } = data

    return { width, height, role, src }
}