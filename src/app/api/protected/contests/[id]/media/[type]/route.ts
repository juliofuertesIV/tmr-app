
import { constructAPIResponse } from "@/app/api/_utils";
import { createAndUploadMedia } from "@/app/api/protected/media/_functions";
import { Contest } from "@/database/models";
import { handleApiError } from "@/lib/errors";
import { NextRequest } from "next/server";

type IContestMediaTypes = 'frame' | 'logo' | 'favicon' | 'banner'

type Params = { 
    params: {
        id: string,
        type: IContestMediaTypes
    }
}

const getForeignKeyByType = (type: IContestMediaTypes) => {

    const foreignKeysByType = {
        frame: 'FrameId',
        favicon: 'FaviconId',
        logo: 'LogoId',
        banner: 'BannerId'
    } as { [key in IContestMediaTypes]: string }

    return foreignKeysByType[type]
}

export const POST = async (req: NextRequest, { params } : Params) => {

    const { id, type } = params

    const formData = await req.formData()

    try {
        const { MediumId } = await createAndUploadMedia({ formData })
        await Contest.update({ [getForeignKeyByType(type)]: MediumId }, { where: { id }})
    }
    catch (error) {
        return handleApiError({
            error,
            route: '/api/contests/media/[type]'
        })
    }

    return Response.json(
        constructAPIResponse({
            message: 'Updated OK.',
            success: true,
            error: null,
            data: null
        })
    )


}