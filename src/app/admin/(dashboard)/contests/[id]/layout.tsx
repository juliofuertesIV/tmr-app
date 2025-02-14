import { getContestFromDatabaseById } from "@/lib/database/functions/contests";
import ContestInnerNav from "./_components/ContestInnerNav";

type Props = {
    params: {
        id: string
    },
    children: React.ReactNode
}


const getLayoutData = async ({ id } : { id: string }) => {

    const contest = await getContestFromDatabaseById({ id, scope: 'detailed'})

    return JSON.parse(JSON.stringify(contest))
}

export default async function Layout({ params, children } : Props) {

    const { id } = params

    const contest = await getLayoutData({ id })

    if (!contest) throw new Error('Contest not found.')

    return (
        <section className="admin-page-content">
            <header className="flex gap-4 items-center mb-2">
                <h1 className="leading-none">{ contest.name } <span className="font-thin">{ contest.year }</span></h1>
            </header>
            <ContestInnerNav contest={ contest }/>
            { children }
        </section>
    )
}
