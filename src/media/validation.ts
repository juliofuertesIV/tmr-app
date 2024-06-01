
export const mediaPayloadIsValidLength = ({ bytes } : { bytes: ArrayBuffer }) => {

    const maxFileSizeInMegabytes = parseInt(process.env.MAX_FILE_SIZE as string)
    
    const byteLimit = maxFileSizeInMegabytes * 1024
    
    return bytes.byteLength < byteLimit;
}
