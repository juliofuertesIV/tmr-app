import { ICollectionNames } from "@/types";
import { createAssociation } from "./_functions/post";
import { handleApiError } from "@/lib/errors";
import { constructAPIResponse } from "@/app/api/_functions";
import { NextRequest } from "next/server";

type Params = { params: { collection: ICollectionNames, id: string, association: string }}

export const POST = async (req: NextRequest, { params } : Params) => {

    const { collection, id, association } = params

    try {
        const formData = await req.formData()
        await createAssociation({ collection, id, association, formData })
    }
    catch (error) {
        return await handleApiError({
            req,
            error,
            route: `/api/${ collection }/[id]/${ association }`
        })
    }

    return Response.json(
        constructAPIResponse({
            message: 'Associated ok.',
            error: null,
            success: true,
            data: null
        })
    )    
}