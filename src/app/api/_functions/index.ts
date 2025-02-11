import { Contest, Manager } from "@/database/models"
import { decryptJWT } from "@/lib/auth"
import { parseError } from "@/lib/errors"
import { Manager as ManagerType, ManagerRoleId } from "@/types"
import { IAPIResponse } from "@/types/api"
import { NextRequest } from "next/server"

export const constructAPIResponse = ({ 
    message,
    success,
    error: apiError,
    data
} : { 
    message: string,
    success: boolean,
    error: unknown | null,
    data: any | null
}) : IAPIResponse<typeof data> => {

    const error = parseError(apiError)

    return {
        message,
        success,
        error,
        data
    }
}

export const getManagerInCookies = async (req: NextRequest) => {

    const sessionToken = req.cookies.get('session') 

    if (sessionToken) 
        return await decryptJWT(sessionToken.value) 
    else 
        return null
}

export const checkRequestAgainstManagerRole = async ({ 
    req, 
    minimumRole 
} : { 
    req: NextRequest, 
    minimumRole: ManagerRoleId 
}) => {

    const manager = await getManagerInCookies(req)

    if (!manager) throw new Error('Permission error. You do not have permission to use this route.')

    if (manager.RoleId < minimumRole) throw new Error('Permission denied. Your manager role does not allow you to do this.')

}

export const checkRequestAgainstManagerContest = async ({ 
    req, 
    targetContestId 
} : { 
    req: NextRequest, 
    targetContestId: string 
}) => {

    const manager = await getManagerInCookies(req)

    if (!manager) 
        throw new Error('Permission error. You do not have permission to use this route.')

    if (manager.RoleId < 2) 
        throw new Error('Permission denied. Your manager role does not allow you to do this.')

    const editor = await Manager.findOne({ where: { id: manager.id }, include: [Contest]}).then(data => data) as unknown as ManagerType | null

    if (!editor) 
        throw new Error('Error finding this manager on database.')

    const contestBelongsToEditor = editor.Contests.find(one => one.id === targetContestId)

    if (!contestBelongsToEditor) 
        throw new Error('You don\'t have permission to edit this particular contest. Ask your admins.')

}

export const checkRequestAgainstManagerProfile = async ({
    req,
    targetManagerId
} : {
    req: NextRequest,
    targetManagerId: string
}) => {

    const manager = await getManagerInCookies(req)

    if (!manager) 
        throw new Error('Permission error. You do not have permission to use this route.')

    if (manager.id != targetManagerId && manager.RoleId < 4) {
        throw new Error('Permission error. You can\`t edit another manager\'s profile.')
    }
}


