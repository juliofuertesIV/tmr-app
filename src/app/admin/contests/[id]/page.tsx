import { getCollectionElementById } from "@/app/_fetch/get"
import { Brand, Param, State } from "@/database"
import { IBrand, IContestState, IParam } from "@/interfaces"
import ContestPanel from "../../_contests/panel/ContestPanel"

const getData = async () : Promise<{ states: IContestState[], brands: IBrand[], contestParams: IParam[] }> => {
    const states = await State.findAll().then(data => data) as unknown as IContestState[]
    const brands = await Brand.findAll().then(data => data) as unknown as IBrand[]
    const params = await Param.findAll().then(data => data) as unknown as IParam[]
    
    return { 
        states: JSON.parse(JSON.stringify(states)),
        brands: JSON.parse(JSON.stringify(brands)), 
        contestParams: JSON.parse(JSON.stringify(params))
    }
}

export default async function AdminElementPage({ params } : { params: { id: string }}) {
    
    const { id } = params

    const { data: contest } = await getCollectionElementById('contests', id)

    const { states, brands, contestParams } = await getData()

    if (!contest) return <div>No contest found.</div>

    return (
        <ContestPanel relationships={{ states, brands, params: contestParams }} contest={ contest }/>
    )
}
