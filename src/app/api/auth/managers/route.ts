import { Manager } from "@/lib/database"
import { constructAPIResponse } from "../../_utils"
import { getHashAndSaltFromPassword } from "../../../../lib/auth/crypto"
import { handleApiError } from "@/lib/errors"

export const POST = async (req: Request) => {

    const requestPayload = await req.json()

    const managerCreationPayload = getManagerCreationPayload({ ...requestPayload })

    try {
        const data = await Manager.create({ ...managerCreationPayload })
        
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
        return await handleApiError({
            error, 
            collection: 'managers',
            route: `/api/auth/managers`
        })
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
