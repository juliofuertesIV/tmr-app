import { Media } from "@/database/models"
import { handleApiError } from "@/lib/errors"
import { constructAPIResponse } from "../../_utils"

type Params = { 
    params: {
        id: string
    }
}

export const GET = async (req: Request, { params } : Params) => { 

    const { id } = params

    let medium;

    try {
        await Media.findOne({ where: { id }}).then(data => data)
    }
    catch (error) {
        return await handleApiError({ 
            error, 
            route: 'api/media' 
        })
    }

    return Response.json(
        constructAPIResponse({
            message: 'Fetched',
            success: true,
            error: null,
            data: medium
        })
    )
}
