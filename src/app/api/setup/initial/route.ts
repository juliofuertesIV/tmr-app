
import { brands, genres, params, roles, social, states, superAdmin } from '@/lib/data/initial'
import { Param, State, Genre, Brand, SocialMedia, sequelize, Manager, Role } from '@/lib/database'
import { constructAPIResponse } from '../../_utils'
import { getHashAndSaltFromPassword } from '../../../../lib/auth'

export const GET = async () => {
    
    await sequelize.drop()
    
    await sequelize.sync({ force: true })
    .then(() => {
        return Response.json({ message: 'OK!', success: true, error: null, payload: { manager, addedGenres, addedParams, addedStates, addedBrands, addedSocial }})
    })
    .catch((error) => {
        return Response.json(
            constructAPIResponse({ 
                message: "Creación de la DB da error.",
                success: true,
                error,
                data: null
            })
        )
    })

    let addedGenres, addedStates, addedParams, addedBrands, addedSocial, addedRoles, manager

/*     try {    
        addedParams = await Param.bulkCreate(params)
        addedStates = await State.bulkCreate(states)
        addedGenres = await Genre.bulkCreate(genres)
        addedBrands = await Brand.bulkCreate(brands)
        addedSocial = await SocialMedia.bulkCreate(social)
        addedRoles = await Role.bulkCreate(roles)
    }
    catch (error) {
        return Response.json(
            constructAPIResponse({ 
                message: "Bulk de elementos iniciales da error.",
                success: true,
                error,
                data: null
            })
        )
    } */


 /*    const managerCreationPayload = getManagerCreationPayload({ ...superAdmin })

    const transaction = await sequelize.transaction()

    try {
        manager = await Manager.create({ ...managerCreationPayload }, { transaction })
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
     */
    return Response.json({ message: 'Database models not created!', success: false, error: null, payload: { manager, addedGenres, addedParams, addedStates, addedBrands, addedSocial }})
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
