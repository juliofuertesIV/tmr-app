import { constructAPIResponse } from "@/app/api/_utils";
import { createAndUploadMedia } from "@/app/api/media/_functions";
import { Contest } from "@/database/models";
import { handleApiError } from "@/lib/errors";
import { deleteMediaInStorageAndDatabase } from "@/lib/media/delete";
import { IContestMediaRole } from "@/types/media";
import { NextRequest } from "next/server";
import { addMediaToContest } from "./_functions";


type Params = {
    params: {
        id: string,
        type: IContestMediaRole
    }
}

export const POST = async (req: NextRequest, { params } : Params) => {

    const { id, type } = params

    const formData = await req.formData()

    try {
        await addMediaToContest({ id, type, formData })
    }
    catch (error) {
        return handleApiError({
            error,
            route: '/api/contests/media/[type]'
        })
    }

    return Response.json(
        constructAPIResponse({
            message: 'Updated ok.',
            success: true,
            error: null,
            data: null
        })
    )
}
