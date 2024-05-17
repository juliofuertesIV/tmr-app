import { Brand, Contest, Genre, Media, Param, SocialMedia, State } from "@/database"
import { constructAPIResponse } from "../_utils"

export const GET = async () => {
    
    const contests = await Contest.findAll({ include: [ Brand, State, Genre, Media, SocialMedia, Param ]}).then(data => data)
    const brands = await Brand.findAll().then(data => data)
    const params = await Param.findAll().then(data => data)
    const states = await State.findAll().then(data => data)
    const genres = await Genre.findAll().then(data => data)
    
    return Response.json(
        constructAPIResponse({ 
            message: 'OK!',
            success: true,
            error: null,
            data: { contests, brands, params, states, genres } 
        })
    )
}