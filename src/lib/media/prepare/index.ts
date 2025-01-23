import { ICollectionsWithMediaNames, ICollectionsWithMediumNames } from "@/types/media"
import { getFolderByCollectionName, produceFileName } from "./functions"

export const getFileGCPStorageSrc = ({ 
    domain,
    collection,
    file 
} : { 
    domain: string | null,
    collection: ICollectionsWithMediaNames | ICollectionsWithMediumNames,
    file: File 
}) => {

    const filename = produceFileName(file.name)

    const { folder, error } = getFolderByCollectionName({ collection, domain })

    if (!folder) throw new Error('Error generating folder for file.')

    if (!folder && !!error) throw new Error(error)

    return { 
        src: `https://storage.googleapis.com/${process.env.GCP_BUCKET}/${ folder }/${ filename }`, 
        folder,
        filename
    }
}
