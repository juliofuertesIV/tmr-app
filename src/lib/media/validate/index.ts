
import { getFileGCPStorageSrc } from "../prepare";
import { validateFileTypeAndSize, validateMediaFormDataFields } from "./functions";

export const validateFile = async ({ formData } : { formData: FormData }) => {

    let 
        file,
        role,
        alt,
        width,
        height,
        collection,
        domain,
        src,
        folder,
        filename,
        bytes;

        try {
            const validatedFormData = validateMediaFormDataFields({ formData }) // checks for file, role, alt, width, height 
            file = validatedFormData.file
            role = validatedFormData.role
            alt = validatedFormData.alt
            width = validatedFormData.width
            height = validatedFormData.height
            collection = validatedFormData.collection
            domain = validatedFormData.domain

        }
        catch (error) {
            throw new Error(error as string)
        }

        try {
            const storageStrings = getFileGCPStorageSrc({ domain, collection, file }) // get GCP folder destination
            src = storageStrings.src
            filename = storageStrings.filename
            folder = storageStrings.folder
        }
        catch (error) {
            throw new Error(error as string)
        }

        try {
            const validatedFile = await validateFileTypeAndSize({ file }) // checks for maximum size and MIME types
            bytes = validatedFile.bytes
        }
        catch(error) {
            throw new Error(error as string)
        }

    return { 
        width,
        height,
        alt,
        role,
        src,
        folder,
        filename,
        bytes 
    }
}