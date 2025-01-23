import { createMediumInDatabase } from "@/lib/media/create/functions";
import { validateFile } from "@/lib/media/validate";
import { uploadToGoogleCloudStorage } from "@/lib/storage/gcp_storage";

export const createAndUploadMedia = async ({ formData } : { formData: FormData }) => {
    let validatedPayload;
    
        try {
            validatedPayload = await validateFile({ formData })
        } catch (error) {
            throw new Error(error as string)
        }
    
        const { 
            role,
            alt,
            width,
            height,
            src,
            folder,
            filename,
            bytes 
        } = validatedPayload


        console.log({
            role,
            alt,
            width,
            height,
            src,
            folder,
            filename,
            bytes
        })
        
        let mediaInsertion;
    
        try {
            mediaInsertion = await createMediumInDatabase({ width, height, alt, role, src, filename })
        } catch (error) {
            throw new Error(error as string)
        }
        
        const { MediumId, transaction } = mediaInsertion
    
        try {
            await uploadToGoogleCloudStorage({ bytes, folder, filename })
            await transaction.commit()
        }
        catch (error) {
            await transaction.rollback()
            throw new Error(error as string)
        }


    return {        
        width,
        height,
        alt,
        role,
        src,
        filename,
        MediumId
    }        
}