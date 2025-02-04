import { NextRequest } from "next/server"
import { constructAPIResponse } from "../../../_utils"

export const GET = async (request: NextRequest) => {

    return Response.json(
        constructAPIResponse({
            message: 'Logout correcto.',
            data: { session: "", expires: new Date(Date.now())},
            error: null,
            success: true
        })
    )
}
