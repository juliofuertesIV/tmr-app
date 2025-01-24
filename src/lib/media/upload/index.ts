import { uploadToGoogleCloudStorage } from "@/lib/storage/gcp_storage"


type Props = {
    filename: string,
    folder: string,
    bytes: ArrayBuffer
}

export const uploadMedia = async ({ 
    filename,
    folder,
    bytes,
} : Props
) => {

    await uploadToGoogleCloudStorage({ 
        bytes,
        filename,
        folder
    })
    .catch(async (error) => { throw new Error(error)})
}