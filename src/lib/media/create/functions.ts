import { Media, sequelize } from '@/database/models'
import { IMedia, IMediaRole } from "@/types/media"
import { Transaction } from "sequelize"

export const createMediumInDatabase = async ({ 
    width,
    height,
    role,
    alt,
    filename,
    src
} : { 
    width: string,
    height: string,
    role: IMediaRole,
    alt: string,
    filename: string,
    src: string
}
) : Promise<{ MediumId: string | null, transaction: Transaction }> => {

    const transaction = await sequelize.transaction()
    let createdMedia;

    try {
        createdMedia = await Media.create({
            width,
            height,
            alt,
            role,
            src,
            filename
        }, { 
            transaction 
        }).then(data => data) as unknown as IMedia
    }
    catch (error) {
        throw new Error('Fallo guardando el contenido multimedia en la DB.')
    }

    return { MediumId: createdMedia.id, transaction } 
}

