import { Contest } from "@/database/models"

export const updateContest = async ({ id, formData } : { id: string, formData: FormData}) => {

    const payload = Object.fromEntries(formData)

    try {
        await Contest.update({ ...payload }, { where: { id }})
    }
    catch(error) {
        throw new Error(error as string)
    }
}

export const deleteContest = async ({ id } : { id: string }) => {

    try {
        await Contest.destroy({ where: { id }})
    }
    catch(error) {
        throw new Error(error as string)
    }
}