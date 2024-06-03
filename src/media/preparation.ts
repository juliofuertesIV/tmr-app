import { IOneOfCollectionsWithMediaNames } from "@/types";
import { mediaPayloadIsValidLength } from "./validation";
import path from "path";
import { IMediaPayload } from "@/types/media";

export const produceFileName = (fileName: string) => crypto.randomUUID() + "-" + new Date().getTime() + path.extname(fileName);

export const prepareMediaFile = async ({ 
    payload,
    domain,
    collection 
} : {
    payload: IMediaPayload,
    domain: string,
    collection: IOneOfCollectionsWithMediaNames
}
) : Promise<{ 
    bytes: ArrayBuffer,
    filename: string,
    src: string,
    error: Error | null,
    success: boolean
}> => {

    console.log({ payload, domain, collection })

    const { file } = payload

    const bytes = await file.arrayBuffer();

    const filename = produceFileName(file.name)

    const src = `https://storage.googleapis.com/${process.env.GCP_BUCKET}/${ domain }/${ collection }/${ filename }`

    if (!mediaPayloadIsValidLength({ bytes })) {
        return { bytes, filename, src, error: new Error('La imagen es demasiado grande'), success: false }
    }

    return { bytes, filename, src, error: null, success: true }
}


