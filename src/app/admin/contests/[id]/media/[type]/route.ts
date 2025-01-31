import { IContestMediaRole } from "@/types/media";
import { NextRequest } from "next/server";


type Params = {
    params: {
        id: string,
        type: IContestMediaRole
    }
}

const mediaForeignKeyByType = {
    logo: 'LogoId',
    frame: 'FrameId',
    favicon: 'FaviconId',
    banner: 'BannerId'
}

export const GET = async (req: NextRequest, { params } : Params) => {

    const { id, type } = params

    const foreignKey = mediaForeignKeyByType[type]

}


export const POST = async (req: NextRequest, { params } : Params) => {

    const { id, type } = params

    const foreignKey = mediaForeignKeyByType[type]


}