import { Contest } from "@/database/models"
import { constructAPIResponse } from "../../_functions"
import { handleApiError } from "@/lib/errors"
import { NextRequest } from "next/server"

export const POST = async (req: NextRequest) => {

    const formData = await req.formData()

    const payload = Object.fromEntries(formData)

    try {
        const createdContest = await Contest.create({ 
            ...payload,
            Footer: { name: `${payload.name} (${ payload.year })` }
        }, {
            include: { association: Contest.Footer }
        })
        .then(data => data)

        return Response.json(
            constructAPIResponse({
                message: 'Created ok.',
                success: true,
                error: null,
                data: createdContest
            })
        )
    } 
    catch (error) {
        return await handleApiError({
            req,
            error,
            route: '/api/protected/contests'
        })
    }
}
