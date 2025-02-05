import { IContestMediaFieldNames } from "@/types/associations"
import { IContestMediaRole } from "@/types/media"

export const getMediumForeignKeyByType = (type: IContestMediaRole) => {

    const foreignKeysByType = {
        frame: 'FrameId',
        favicon: 'FaviconId',
        logo: 'LogoId',
        banner: 'BannerId'
    } as { [key in IContestMediaRole]: IContestMediaFieldNames }

    return foreignKeysByType[type]
}