import { getFileSizeLimitInBytes } from "../../[id]/_utils/media";

export const mediaPayloadIsValidLength = ({ bytes } : { bytes: ArrayBuffer }) => {

    const maxFileSize = parseInt(process.env.MAX_FILE_SIZE as string)
    
    const byteLimit = getFileSizeLimitInBytes(maxFileSize)
    
    return bytes.byteLength < byteLimit;
}
