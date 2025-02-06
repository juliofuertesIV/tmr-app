import { IMediaRole } from "@/types/media"

type MediaCreationPayload = {
    file: File,
    width: string,
    height: string,
    role: IMediaRole,
    alt: string,
    collection: 'contests' | 'managers' | 'inscriptions' | 'sponsors',
    domain: string | null
}

export const validateMediaFormDataFields = ({ 
    formData 
} : { 
    formData: FormData 
}) => {

    const basicFields = ['file', 'width', 'height', 'role', 'alt']

    basicFields.forEach(field => {
            if (!formData.get(field)) 
                throw new Error(`No ${ field } found in form data.`)
        }
    )

    return Object.fromEntries(formData.entries()) as MediaCreationPayload
}


export const validateFileTypeAndSize = async ({ 
    file,
    type = 'image' 
} : { 
    file: File,
    type?: 'image' | 'pdf' 
}) => {

    const validType = mediaPayloadIsValidType({ file })
    if (!validType) throw new Error(`Tipo de archivo incorrecto. Tipo esperado: ${ type }. Tipo recibido: ${ file.type }`)

    const bytes = await file.arrayBuffer()
    const validLength = mediaPayloadIsValidLength({ bytes })
    if (!validLength) throw new Error('El archivo es demasiado grande.')

    return { bytes }

}


export const mediaPayloadIsValidType = ({ file } : { file: File }) => {

    const validImageTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp', 'image/vnd.microsoft.icon']

    return validImageTypes.some(imageType => imageType === file.type)
}

export const mediaPayloadIsValidLength = ({ bytes } : { bytes: ArrayBuffer }) => {

    const maxFileSizeInMegabytes = parseInt(process.env.MAX_FILE_SIZE as string)
    const byteLimit = maxFileSizeInMegabytes * 1024 * 1024

    return bytes.byteLength < byteLimit;
}
