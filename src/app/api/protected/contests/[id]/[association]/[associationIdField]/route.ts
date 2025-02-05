import { IContestAssociationIdFieldNames } from "@/types/associations";
import { NextRequest } from "next/server";
import { createContestAssociation } from "../_functions";
import { handleApiError } from "@/lib/errors";
import { constructAPIResponse } from "@/app/api/_utils";
import { deleteContestAssociation } from "./_functions";

type Params = {
    params: {
        id: string,
        associationIdField: IContestAssociationIdFieldNames
    }
}

export const POST = async (req: NextRequest, { params } : Params) => {

    const { id, associationIdField: idField } = params
    
    try {
        const formData = await req.formData()
        createContestAssociation({ id, idField, formData })
    }
    catch (error) {
        return await handleApiError({
            error,
            message: 'Unable to make association.',
            route: '/api/protected/contests/[id]/' + idField,
            req
        })
    }

    return Response.json(
        constructAPIResponse({
            message: 'Associated.',
            success: true,
            error: null,
            data: null
        })
    )
}

export const DELETE = async (req: NextRequest, { params } : Params) => {

    const { id, associationIdField: idField } = params

    try {
        const formData = await req.formData()
        deleteContestAssociation({ id, idField, formData })
    }
    catch (error) {
        return await handleApiError({
            error,
            message: 'Unable to make association.',
            route: '/api/protected/contests/[id]/' + idField,
            req
        })
    }
    
    return Response.json(
        constructAPIResponse({
            message: 'Dissociated.',
            success: true,
            error: null,
            data: null
        })
    )
}