import { ICollectionNames } from "@/types";
import { IAssociationNames } from "@/types/associations";
import { createAssociation } from "./_functions/post";
import { handleApiError } from "@/lib/errors";
import { constructAPIResponse } from "@/app/api/_utils";

type Params = { params: { collection: ICollectionNames, id: string, association: IAssociationNames }}

export const POST = async (req: Request, { params } : Params) => {

    const { collection, id, association } = params

    try {
        const formData = await req.formData()
        await createAssociation({ collection, id, association, formData })
    }
    catch (error) {
        return await handleApiError({
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