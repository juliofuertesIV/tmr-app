import { Media } from "@/database/models"
import { handleApiError } from "@/lib/errors"
import { createAndUploadMedia } from "./_functions"
import { NextRequest } from "next/server"

export const GET = async (req: NextRequest) => { 

    return await Media.findAll()
                .then(data => data)
                .catch(err => handleApiError({ 
                        req,
                        error: err, 
                        route: 'api/media' 
                    })
                )
    
}

export const POST = async (req: NextRequest) => {

    const formData = await req.formData()

    let createdMedium;

    try {
        createdMedium = await createAndUploadMedia({ formData })
    }
    catch (error) {
        return await handleApiError({
            req,
            error,
            route: '/api/media'
        })
    }

    const {        
        width,
        height,
        alt,
        role,
        src,
        filename,
        MediumId,
        transaction
    } = createdMedium
        
    await transaction.commit()

    return Response.json({
        message: 'File created and uploaded!',
        MediumId,
        width,
        height,
        role,
        alt,
        src,
        filename
    })

}
