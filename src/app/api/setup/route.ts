
import { superAdmin } from '@/lib/data/initial/managers'
import { sequelize, Manager } from '@/database/models'
import { constructAPIResponse } from '../_utils'
import { getHashAndSaltFromPassword } from '../../../lib/auth'
import { IManager } from '@/types'
import { Model } from 'sequelize'


export const GET = async () => {
    
    const managerCreationPayload = getManagerCreationPayload({ ...superAdmin })

    const transaction = await sequelize.transaction()

    const isAlreadySetup = await superAdminAlreadyExists() 

    if (isAlreadySetup) {
        return Response.json(
            constructAPIResponse({ 
                message: "Ya existe un super admin para la aplicación.",
                success: true,
                error: null,
                data: null 
            })
        )
    }

    let manager;

    try {
        manager = await (Manager as ModelStatic<Model<any, any>>).create({ ...managerCreationPayload }, { transaction }) as unknown as IManager
        await transaction.commit()
    }
    catch (error) {
        await transaction.rollback();
        return Response.json(
            constructAPIResponse({ 
                message: "Ha habido un problema creando el manager en la base de datos.",
                success: false,
                error,
                data: null 
            })
        )
    }    

    return Response.json({ message: 'SuperAdmin created succesfully!', success: true, error: null, payload: { manager: manager.name }})
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

const superAdminAlreadyExists = async () => {
    
    const manager = await Manager.findOne({ where: { email: process.env.SUPERADMIN_EMAIL }}).then(data => data) as unknown as IManager

    return !!manager
}