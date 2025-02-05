import { IAPIResponse } from "@/types/api"
import { IContestAssociationNames } from "@/types/associations"
import { revalidateTag } from "next/cache"

export const disassociateItemsFromContest = async (
    contestId: string | number,
    association: IContestAssociationNames,
    prevState: any
) : Promise<IAPIResponse<null>> => {

    const res = await fetch(`http://localhost:3000/api/protected/contests/${ contestId }/${ association }/`, {
        method: "DELETE",
        cache: 'no-cache'
    })
    .then(async data => await data.json())
    .catch(error => error)
    
    revalidateTag('contests')
    return res
}