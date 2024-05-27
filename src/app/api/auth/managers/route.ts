import { Manager, sequelize } from "@/database"
import { constructAPIResponse } from "../../_utils"
import { getHashAndSaltFromPassword } from "../../../../auth/crypto"
import { logError } from "../../_utils/errors"

export const POST = async (req: Request) => {

    const requestPayload = await req.json()

    const managerCreationPayload = getManagerCreationPayload({ ...requestPayload })

    const transaction = await sequelize.transaction()

    try {
        const data = await Manager.create({ ...managerCreationPayload }, { transaction })
        await transaction.commit()
        return Response.json(
            constructAPIResponse({ 
                message: "Manager creado correctamente.",
                success: true,
                error: null,
                data 
            })
        )
    }
    catch (error) {
        await transaction.rollback();

        await logError({ 
            error, 
            collection: 'managers',
            route: `/api/auth/managers`
        })

        return Response.json(
            constructAPIResponse({ 
                message: "Ha habido un problema creando el manager en la base de datos.",
                success: false,
                error,
                data: null 
            })
        )
    }
}


const getManagerCreationPayload = (
    { name, email, password, RoleId } : 
    { name: string, email: string, password: string, RoleId: 1 | 2 | 3 | 4 }
) => {

    const { hash, salt } = getHashAndSaltFromPassword(password)

    const manager = {
        name,
        email,
        hash,
        salt,
        RoleId
    }

    return manager
}
