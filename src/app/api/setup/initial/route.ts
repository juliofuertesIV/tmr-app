
import { brands, genres, params, states } from '@/_data/initial'
import { Param, State, Genre, Brand } from '@/database'

export const GET = async () => {
    
    let addedGenres, addedStates, addedParams, addedBrands

    try {    
        addedParams = await Param.bulkCreate(params)
        addedStates = await State.bulkCreate(states)
        addedGenres = await Genre.bulkCreate(genres)
        addedBrands = await Brand.bulkCreate(brands)
    }
    catch (error) {
        return Response.json({ message: 'Error initializing!', success: false, error })
    }
    
    return Response.json({ message: 'OK!', success: true, error: null, payload: { addedGenres, addedParams, addedStates, addedBrands }})
}

