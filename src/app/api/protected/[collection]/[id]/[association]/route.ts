import { handleApiError } from "@/lib/errors";
import { constructAPIResponse } from "@/app/api/_functions";
import { NextRequest } from "next/server";
import { AssociationNames, CollectionsWithAssociationNames } from "@/types/associations";
import { createCollectionAssociation } from "./_functions";

type Params = { params: { collection: CollectionsWithAssociationNames, id: string, association: AssociationNames }}

export const POST = async (req: NextRequest, { params } : Params) => {

    const { collection, id, association } = params

    try {
        const formData = await req.formData()

        await createCollectionAssociation({ id, association, formData })

        return Response.json(
            constructAPIResponse({
                message: 'Associated ok.',
                error: null,
                success: true,
                data: null
            })
        )   
    }
    catch (error) {
        return await handleApiError({
            req,
            error,
            route: `/api/${ collection }/[id]/${ association }`
        })
    } 
}