
import { Contest, Param, State, Genre, sequelize } from '@/database'

export const GET = async () => {

    const contests = await Contest.findAll({
        include: [ Param, State, Genre ]
    }).then(data => data)
    
    return Response.json({ message: 'OK!', success: true, error: null, data: contests })
}

export const POST = async (req: Request) => {

    const payload = await req.json()
    const transaction = await sequelize.transaction()

    try {
        const data = await Contest.create({ ...payload }, { transaction })
        await transaction.commit()
        return Response.json({ message: "Concurso creado correctamente.", success: true, error: null, data })
    }
    catch (error) {
        await transaction.rollback();
        return Response.json({ message: "Ha habido un problema creando el concurso.", success: false, error, data: null })
    }
}
