import { Media, sequelize } from '@/database/models'
import { Media as MediaType, MediaRole } from "@/types/media"
import { Transaction } from "sequelize"

export const createMediumInDatabase = async ({ 
    width,
    height,
    role,
    alt,
    filename,
    folder,
    src
} : { 
    width: string,
    height: string,
    role: MediaRole,
    alt: string,
    filename: string,
    folder: string,
    src: string
}
) : Promise<{ MediumId: string, transaction: Transaction }> => {

    const transaction = await sequelize.transaction()
    let createdMedia;

    try {
        createdMedia = await Media.create({
            width,
            height,
            alt,
            role,
            src,
            filename,
            folder
        }, { 
            transaction 
        }).then(data => data) as unknown as MediaType
    }
    catch (error) {
        throw new Error('Fallo guardando el contenido multimedia en la DB.')
    }

    return { MediumId: createdMedia.id, transaction } 
}


