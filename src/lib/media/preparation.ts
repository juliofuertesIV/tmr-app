import { ICollectionsWithMediaNames, ICollectionsWithMediumNames } from "@/types/media";
import { mediaPayloadIsValidLength } from "./validation";
import path from "path";
import { IMediaPayload } from "@/types/media";


export const prepareMediaFile = async ({ 
    payload,
    domain,
    collection 
} : {
    payload: IMediaPayload,
    domain: string,
    collection: ICollectionsWithMediaNames | ICollectionsWithMediumNames
}
) : Promise<{ 
    bytes: ArrayBuffer,
    filename: string,
    src: string,
    error: Error | null,
    success: boolean
}> => {

    const { file } = payload

    console.log({ file })

    if (!file) {
        return { bytes: new ArrayBuffer(), filename: '', src: '', error: new Error('No hay archivo.'), success: false }
    }

    const bytes = await file.arrayBuffer();

    const filename = produceFileName(file.name)

    const src = getMediaFileSrc({ domain, collection, filename })

    if (!mediaPayloadIsValidLength({ bytes })) {
        return { bytes, filename, src, error: new Error('El archivo es demasiado grande'), success: false }
    }

    return { bytes, filename, src, error: null, success: true }
}


const getMediaFileSrc = ({ domain, collection, filename } : { domain: string, collection: ICollectionsWithMediaNames | ICollectionsWithMediumNames, filename: string }) => {

    const folder = getFolderByCollectionName({ collection, domain })

    return `https://storage.googleapis.com/${process.env.GCP_BUCKET}/${ folder }/${ filename }`
}


export const getFolderByCollectionName = ({ collection, domain } : { collection: ICollectionsWithMediaNames | ICollectionsWithMediumNames, domain: string }) : string => {

    if (collection === 'inscriptions') return `${ domain }/inscriptions`
    
    if (collection === 'contests') return `${ domain }/contest`
    
    if (collection === 'managers') return 'managers'

    if (collection === 'sponsors') return 'sponsors'
    
    return domain
}

export const produceFileName = (fileName: string) => crypto.randomUUID() + "-" + new Date().getTime() + path.extname(fileName);