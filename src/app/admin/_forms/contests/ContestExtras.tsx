import { State } from "@/database"
import { IContest, IContestState } from "@/interfaces"
import AdminContestStates from "../inputs/AdminContestStates"

const getStates = async () : Promise<IContestState[]> => {
    const states = await State.findAll().then(data => data) as unknown as IContestState[]
    return states
}

export default async function ContestExtras({ contest } : { contest: IContest }) {

    const states = await getStates()

    return (
        <AdminContestStates states={ states } contest={ contest }/>
    )
}
