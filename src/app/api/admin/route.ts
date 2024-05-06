import { Brand, Contest, ContestMedia, Param, State } from "@/database"
import { constructAPIResponse } from "../_utils"

export const GET = async () => {
    
    const contests = await Contest.findAll({ include: [ Brand, State, { model: ContestMedia, as: 'Media' }, Param ]}).then(data => data)
    const brands = await Brand.findAll().then(data => data)
    const params = await Param.findAll().then(data => data)
    const states = await State.findAll().then(data => data)
    
    return Response.json(
        constructAPIResponse({ 
            message: 'OK!',
            success: true,
            error: null,
            data: { contests, brands, params, states } 
        })
    )
}