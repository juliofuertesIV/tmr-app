import { addContest } from "@/lib/fetch/post/contests"
import { updateContest } from "@/lib/fetch/put/contests"

export const getAddContestBoundAction = () => addContest.bind(null)

export const getUpdateContestBoundAction = ({ id } : { id: string }) => updateContest.bind(null, id)
