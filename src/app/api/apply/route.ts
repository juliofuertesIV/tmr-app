import { Inscription, sequelize } from "@/database"
import { handleApiError } from "../_utils/errors"
import { constructAPIResponse } from "../_utils"

export const POST = async (req: Request) => {

    const payload = await req.formData()
    
    const transaction = await sequelize.transaction();

    try {
        const data = await Inscription.create({ ...payload }, { transaction })

        return Response.json(
            constructAPIResponse({ 
                message: "Candidatura inscrita correctamente.",
                success: true,
                error: null,
                data 
            })
        )
    }
    catch (error) {
        handleApiError({ 
            transaction,
            collection: 'inscriptions',
            route: '/api/apply',
            error,
            message: 'Fallo inscribiendo candidatura.' 
        })
    }
}