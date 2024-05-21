import { Brand, Contest, Genre, Media, Param, SocialMedia, State } from "@/database"
import { constructAPIResponse } from "../_utils"
import { IBrand, IContest, IContestState, IGenre, IParam, ISocialMedia } from "@/types"
import { IAdminData } from "@/types/admin"

export const GET = async () => {
    
    try {

        const contests = await Contest.findAll({ include: [ Brand, State, Genre, Media, SocialMedia, Param ]}).then(data => data) as unknown as IContest[]
        const brands = await Brand.findAll().then(data => data) as unknown as IBrand[]
        const params = await Param.findAll().then(data => data) as unknown as IParam[]
        const states = await State.findAll().then(data => data) as unknown as IContestState[]
        const genres = await Genre.findAll().then(data => data) as unknown as IGenre[]
        const social = await SocialMedia.findAll().then(data => data) as unknown as ISocialMedia[]
        const managers = [{}, {}] 
        const inscriptions = [{}, {}]
        
        return Response.json(
            constructAPIResponse({ 
                message: 'OK!',
                success: true,
                error: null,
                data: { contests, brands, params, states, genres, social, inscriptions, managers } as IAdminData
            })
        )
    }
    
    catch (error) {
        
        return Response.json(
            constructAPIResponse({ 
                message: 'Error getting data from database',
                success: false,
                error,
                data: null
            })
        )
        
    }
}
