
import { genres, params, states } from '@/_data/initial'
import { Param, State, Genre } from '@/database'

export const GET = async () => {
    
    let addedGenres, addedStates, addedParams

    try {    
        addedParams = await Param.bulkCreate(params)
        addedStates = await State.bulkCreate(states)
        addedGenres = await Genre.bulkCreate(genres)
    }
    catch (error) {
        return Response.json({ message: 'Error initializing!', success: false, error })
    }
    
    return Response.json({ message: 'OK!', success: true, error: null, payload: { addedGenres, addedParams, addedStates }})
}

