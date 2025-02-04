import { createAndUploadMedia } from "@/app/api/protected/media/_functions"
import { Contest } from "@/database/models"
import { IContestMediaRole } from "@/types/media"

export const addMediaToContest = async ({
    type,
    id,
    formData
} : {
    type: IContestMediaRole,
    id: string,
    formData: FormData
}) => {

    const mediaForeignKeyByType = {
        logo: 'LogoId',
        frame: 'FrameId',
        favicon: 'FaviconId',
        banner: 'BannerId'
    }

    const foreignKey = mediaForeignKeyByType[type]

    let MediumId;

    try {
        MediumId = await createAndUploadMedia({ formData })
    }
    catch (error) {
        throw new Error(error as string)
    }
    
    try {
        await Contest.update({ [foreignKey]: MediumId }, { where: { id }})
    }
    catch (error) {
        throw new Error(error as string)
    }
}