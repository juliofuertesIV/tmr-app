import { Contest, sequelize } from "@/database";

export const GET = async (req: Request, { params } : { params: { id: string | number }}) => {

    const { id } = params

    const response = await Contest.findOne({ where: { id }})

    return Response.json(response)

}

export const PUT = async (req: Request, { params } : { params: { id: string | number }}) => {

    const { id } = params

    const payload = await req.json()

    const transaction = await sequelize.transaction()

    try {
        const affectedRows = await Contest.update({ ...payload }, { where: { id }, transaction })
        await transaction.commit()
        return Response.json({ message: "Concurso actualizado correctamente.", affectedRows })
    }
    catch (error) {
        await transaction.rollback();
        return Response.json({ message: "Ha habido un problema actualizando el concurso." })
    }
}
