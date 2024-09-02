const validImageTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp', 'image/vnd.microsoft.icon']

export const mediaPayloadIsValidType = ({ file } : { file: File }) => {
    return validImageTypes.some(imageType => imageType === file.type)
}

export const mediaPayloadIsValidLength = ({ bytes } : { bytes: ArrayBuffer }) => {

    const maxFileSizeInMegabytes = parseInt(process.env.MAX_FILE_SIZE as string)
    const byteLimit = maxFileSizeInMegabytes * 1024
    
    return bytes.byteLength < byteLimit;
}

export const validateMedia = async ({ file, type } : { file: File, type: 'image' }) => {

    const validType = mediaPayloadIsValidType({ file })
    if (!validType) throw new Error(`Tipo de archivo incorrecto. Tipo esperado: ${ type }. Tipo recibido: ${ file.type }` )

    const bytes = await file.arrayBuffer()
    const validLength = mediaPayloadIsValidLength({ bytes })
    if (!validLength) throw new Error('El archivo es demasiado grande.')

}