import { ContestParam, sequelize } from "@/database"
import { constructAPIResponse } from "../_utils"

export const POST = async (req: Request) => {

    const { ParamId, ContestId } = await req.json()

    const transaction = await sequelize.transaction()

    try {
        const data = await ContestParam.create({ ParamId, ContestId }, { transaction })
        await transaction.commit()
        return Response.json(
            constructAPIResponse({ 
                message: "Parámetro asociado correctamente.",
                success: true,
                error: null,
                data 
            })
        )
    }
    catch (error) {
        await transaction.rollback();
        return Response.json(
            constructAPIResponse({ 
                message: "Ha habido un problema asociando el parámetro.",
                success: false,
                error,
                data: null 
            })
        )
    }
}

export const DELETE = async (req: Request) => {

    const { ParamId, ContestId } = await req.json()

    const transaction = await sequelize.transaction()

    try {
        const data = await ContestParam.destroy({ where: { ParamId, ContestId }, transaction })
        await transaction.commit()
        return Response.json(
            constructAPIResponse({ 
                message: "Parámetro eliminado correctamente.",
                success: true,
                error: null,
                data 
            })
        )
    }
    catch (error) {
        await transaction.rollback();
        return Response.json(
            constructAPIResponse({ 
                message: "Ha habido un problema eliminando el parámetro.",
                success: false,
                error,
                data: null 
            })
        )
    }
}
