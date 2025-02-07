import { IContestMediaRole } from "@/types/media"
import { NextRequest } from "next/server"
import { createAndUploadMedia } from "../../../media/_functions"
import { getMediumForeignKeyByType } from "./_functions"
import { Contest } from "@/database/models"
import { handleApiError } from "@/lib/errors"
import { constructAPIResponse } from "@/app/api/_utils"

type RouteParams = {
    params: {
        id: string
    }
}

export const POST = async (req: NextRequest, { params } : RouteParams) => {

    const { id } = params

    const formData = await req.formData()

    const role = formData.get('role') as IContestMediaRole

    if (!role) return handleApiError({
        req,
        error: new Error('Field role not found in FormData'),
        route: '/api/protected/contests/media/[type]'
    })

    try {
        const { MediumId, transaction } = await createAndUploadMedia({ formData })
        
        await Contest.update({ [getMediumForeignKeyByType(role)]: MediumId }, { where: { id }, transaction })

        await transaction.commit()
    }
    catch (error) {
        
        return handleApiError({
            req,
            error,
            route: '/api/protected/contests/media/[type]'
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