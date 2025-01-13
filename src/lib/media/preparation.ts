import { ICollectionsWithMediaNames } from "@/types/media";
import { mediaPayloadIsValidLength } from "./validation";
import path from "path";
import { IMediaPayload } from "@/types/media";
import { ICollectionNames } from "@/types";

export const produceFileName = (fileName: string) => crypto.randomUUID() + "-" + new Date().getTime() + path.extname(fileName);

const getMediaFileSrc = ({domain, collection, filename } : { domain: string, collection: ICollectionNames, filename: string }) => {

    if (collection === 'managers') 
        return `https://storage.googleapis.com/${process.env.GCP_BUCKET}/managers/${ collection }/${ filename }`

    return `https://storage.googleapis.com/${process.env.GCP_BUCKET}/${ domain }/${ collection }/${ filename }`
}

export const prepareMediaFile = async ({ 
    payload,
    domain,
    collection 
} : {
    payload: IMediaPayload,
    domain: string,
    collection: ICollectionsWithMediaNames
}
) : Promise<{ 
    bytes: ArrayBuffer,
    filename: string,
    src: string,
    error: Error | null,
    success: boolean
}> => {

    const { file } = payload

    const bytes = await file.arrayBuffer();

    const filename = produceFileName(file.name)

    const src = getMediaFileSrc({ domain, collection, filename })

    if (!mediaPayloadIsValidLength({ bytes })) {
        return { bytes, filename, src, error: new Error('El archivo es demasiado grande'), success: false }
    }

    return { bytes, filename, src, error: null, success: true }
}
