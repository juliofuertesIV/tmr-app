import Link from "next/link";
import ContestInnerNav from "./_components/ContestInnerNav";
import { getContestById } from "@/lib/fetch/get/contests";

type Props = {
    params: {
        id: string
    },
    children: React.ReactNode
}


export default async function Layout({ params, children } : Props) {

    const { id } = params

    const { data: contest } = await getContestById({ id }) 

    if (!contest) throw new Error(`No se encuentra concurso con la ID: ${ id }`)

    return (
        <section className="admin-page-content">
            <header className="flex gap-4 items-center mb-2">
                <h1 className="leading-none">{ contest.name } <span className="font-thin">{ contest.year }</span></h1>
            </header>
            <ContestInnerNav id={ id }/>
            { children }
        </section>
    )
}
