import { Media } from "@/database/models"
import { handleApiError } from "@/lib/errors"
import { createAndUploadMedia } from "./_functions"

export const GET = async (req: Request) => { 

    return await Media.findAll()
                .then(data => data)
                .catch(err => handleApiError({ 
                        error: err, 
                        route: 'api/media' 
                    })
                )
    
}

export const POST = async (req: Request) => {

    const formData = await req.formData()

    let createdMedium;

    try {
        createdMedium = await createAndUploadMedia({ formData })
    }
    catch (error) {
        return handleApiError({
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
