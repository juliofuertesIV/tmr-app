import { getContestFromDatabaseById } from "@/lib/database/functions/contests"

export const getContestPageData = async ({ id } : { id: string }) => {

    const contest = await getContestFromDatabaseById({ id, scope: 'detailed' })
    .then(data => JSON.parse(JSON.stringify(data)))
    .catch(error => { throw new Error(error as string)})

    return contest
}