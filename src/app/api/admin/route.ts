import { Brand, Contest, Genre, Inscription, Media, Param, SocialMedia, State } from "@/lib/database"
import { constructAPIResponse } from "../_utils"
import { IBrand, IContest, IInscription } from "@/types"
import { IDashboardData } from "@/types/admin"

export const GET = async () => {
    
    try {
        const contests = await Contest.findAll({ 
            include: [ Brand, State, Genre, Media, SocialMedia, Param, Inscription ],
            order: [['createdAt', 'DESC']],
            limit: 4
        })
        .then(data => data) as unknown as IContest[]
        
        return Response.json(
            constructAPIResponse({ 
                message: 'OK!',
                success: true,
                error: null,
                data: { contests } as IDashboardData
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
