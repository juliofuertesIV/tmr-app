import { handleApiError } from "@/lib/errors"
import { constructAPIResponse } from "../../../_utils"
import { deleteMediaInStorageAndDatabase } from "@/lib/media/delete"

type Params = { 
    params: {
        id: string
    }
}

export const DELETE = async (req: Request, { params } : Params) => {

    console.log('DELETING')
    console.log('DELETING')
    console.log('DELETING')
    console.log('DELETING')
    console.log('DELETING')
    console.log('DELETING')

    const { id } = params

    try {
        await deleteMediaInStorageAndDatabase({ MediumId: id })
    }
    catch (error) {
        
        console.log({ error })
        console.log({ error })
        console.log({ error })
        console.log({ error })
        console.log({ error })
        console.log({ error })

        return await handleApiError({
            error,
            route: '/api/media/[id]'
        })
    }

    return Response.json(
        constructAPIResponse({
            message: 'Deleted ok.',
            success: true,
            error: null,
            data: null
        })
    )

}
