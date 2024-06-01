import { IMediaRole, IOneOfCollectionsWithMediaNames } from "@/types";
import { mediaPayloadIsValidLength } from "./validation";
import path from "path";

export const produceFileName = (fileName: string) => crypto.randomUUID() + "-" + new Date().getTime() + path.extname(fileName);

export const prepareMediaFile = async ({ 
    payload,
    domain,
    collection 
} : {
    payload: {
        file: File,
        height: string,
        width: string,
        role: IMediaRole
    },
    domain: string,
    collection: IOneOfCollectionsWithMediaNames
}
) : Promise<{ 
    bytes: ArrayBuffer,
    filename: string,
    src: string
}> => {

    const { file, width, height, role } = payload

    const bytes = await file.arrayBuffer();

    if (!mediaPayloadIsValidLength({ bytes })) {
        throw new Error('La imagen es demasiado grande')
    }
    
    const filename = produceFileName(file.name)

    const src = `https://storage.googleapis.com/${process.env.GCP_BUCKET}/${ domain }/${ collection }/${ filename }`

    return { bytes, filename, src }
}


