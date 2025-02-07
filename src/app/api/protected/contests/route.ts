import { Brand, Contest, Genre, Param, SocialMedia, State } from "@/database/models"
import { constructAPIResponse } from "../../_utils"
import { handleApiError } from "@/lib/errors"
import { Inscription } from "@/database/models/"
import { NextRequest } from "next/server"

export const GET = async (req: NextRequest) => {
    
    let contests

    try {
        contests = await Contest.findAll({
            include: [
                Inscription,
                Brand,
                State,
                Genre,
                SocialMedia,
                Param
            ]
        }
        ).then(data => data)
    }
    catch (error) {
        return await handleApiError({
            req,
            error,
            route: '/api/protected/contests'
        })
    }

    return Response.json(
        constructAPIResponse({
            message: 'Fetched ok.',
            success: true,
            error: null,
            data: contests
        })
    )
}

export const POST = async (req: NextRequest) => {

    const formData = await req.formData()

    let createdContest; 

    try {
        await Contest.create({ ...Object.fromEntries(formData)})
        .then(data => createdContest = data)
    } 
    catch (error) {
        return await handleApiError({
            req,
            error,
            route: '/api/protected/contests'
        })
    }
    
    return Response.json(
        constructAPIResponse({
            message: 'Created ok.',
            success: true,
            error: null,
            data: createdContest
        })
    )
}
