import { constructAPIResponse } from '@/app/api/_utils'
import { Manager } from '@/database/models'
import { getHashAndSaltFromPassword } from '@/lib/auth'
import { handleApiError } from "@/lib/errors"

type Params = {
    params: { id: string }
}

export const PUT = async (req: Request, { params } : Params) => {

    const formData = await req.formData()

    const { id } = params

    const fields = getManagerUpdatePayload({ formData })

    try {
        await Manager.update({ ...fields }, { where: { id }})
        
        return Response.json(
            constructAPIResponse({ 
                message: "Manager actualizado correctamente.",
                success: true,
                error: null,
                data: null 
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


const getManagerUpdatePayload = (
    { formData } : 
    { formData: FormData }
) => {

    if (!isValidFormData(formData)) {
        throw new Error('invalid form data')
    }

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!password) {
        const fields = { name, email }
        return fields
    }
    
    const { hash, salt } = getHashAndSaltFromPassword(password)
    
    const fields = {
        name,
        email,
        hash,
        salt
    }

    return fields
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