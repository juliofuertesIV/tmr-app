import { Brand, Contest, Genre, Inscription, Media, Param, SocialMedia, State } from "@/lib/database"
import { constructAPIResponse } from "../_utils"
import { IBrand, IContest, IInscription } from "@/lib/types"
import { IAdminData } from "@/types/admin"

export const GET = async () => {
    
    try {
        const contests = await Contest.findAll({ 
            include: [ Brand, State, Genre, Media, SocialMedia, Param ],
            order: [['createdAt', 'DESC']],
            limit: 4
        })
        .then(data => data) as unknown as IContest[]

        const brands = await Brand.findAll({ 
            order: [['createdAt', 'DESC']],
            limit: 4
        }).then(data => data) as unknown as IBrand[]
        
        const inscriptions = await Inscription.findAll({
            order: [['createdAt', 'DESC']],
            limit: 10,
            include: [ Media, Contest ]
        }).then(data => data) as unknown as IInscription[]
        
        return Response.json(
            constructAPIResponse({ 
                message: 'OK!',
                success: true,
                error: null,
                data: { contests, brands, inscriptions } as IAdminData
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
