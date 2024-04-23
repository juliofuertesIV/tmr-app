import { Brand, State } from "@/database"
import { IBrand, IContest, IContestState } from "@/interfaces"
import AdminContestStates from "../inputs/AdminContestStates"
import AdminContestBrands from "../inputs/AdminContestBrands"

const getData = async () : Promise<{ states: IContestState[], brands: IBrand[] }> => {
    const states = await State.findAll().then(data => data) as unknown as IContestState[]
    const brands = await Brand.findAll().then(data => data) as unknown as IBrand[]
    
    return { states: JSON.parse(JSON.stringify(states)), brands: JSON.parse(JSON.stringify(brands)) }

    // make fetch call for everything in the long run
}

export default async function ContestExtras({ contest } : { contest: IContest }) {

    const { states, brands } = await getData()

    return (
        <div className="flex flex-wrap gap-2">
            <div className="w-full max-w-xl min-w-96">
                <AdminContestBrands brands={ brands } contest={ contest }/>
            </div>
            <div className="w-full max-w-xl min-w-96">
                <AdminContestStates states={ states } contest={ contest }/>
            </div>
        </div>
    )
}
