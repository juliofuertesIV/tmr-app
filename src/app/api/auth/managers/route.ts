import { Manager } from "@/lib/database"
import { constructAPIResponse } from "../../_utils"
import { getHashAndSaltFromPassword } from "../../../../lib/auth/crypto"
import { handleApiError } from "@/lib/errors"

export const POST = async (req: Request) => {

    const formData = await req.formData()

    const managerCreationPayload = getManagerCreationPayload({ formData })

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
    { formData } : 
    { formData: FormData }
) : { name: string, email: string, hash: string, salt: string } => {

    if (!isValidFormData(formData)) {
        throw new Error('invalid form data')
    }

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    
    const { hash, salt } = getHashAndSaltFromPassword(password)
    
    const manager = {
        name,
        email,
        hash,
        salt
    }

    return manager
}

const isValidFormData = (formData: FormData) => {

    Array.from(formData.entries()).forEach(entry => {
        const isValid = !!entry && (typeof entry === 'string')
        if (!isValid) {
            return false
        }
    })
    return true
}