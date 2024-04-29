import { Brand, Param, State } from "@/database"
import { IBrand, IContest, IContestState, IParam } from "@/interfaces"
import AdminContestStates from "./AdminContestStates"
import AdminContestBrands from "./AdminContestBrands"
import AdminContestParams from "./AdminContestParams"

const getData = async () : Promise<{ states: IContestState[], brands: IBrand[], params: IParam[] }> => {
    const states = await State.findAll().then(data => data) as unknown as IContestState[]
    const brands = await Brand.findAll().then(data => data) as unknown as IBrand[]
    const params = await Param.findAll().then(data => data) as unknown as IParam[]
    
    return { 
        states: JSON.parse(JSON.stringify(states)),
        brands: JSON.parse(JSON.stringify(brands)), 
        params: JSON.parse(JSON.stringify(params))
    }
}

export default async function ContestExtras({ contest } : { contest: IContest }) {

    const { states, brands, params } = await getData()

    return (
        <div className="flex flex-wrap gap-2">
            <div className="w-full max-w-xl min-w-96">
                <AdminContestBrands brands={ brands } contest={ contest }/>
            </div>
            <div className="w-full max-w-xl min-w-96">
                <AdminContestStates states={ states } contest={ contest }/>
            </div>
            <div className="w-full max-w-xl min-w-96">
                <AdminContestParams contest={ contest } params={ params }/>
            </div>            
        </div>
    )
}
