import { ICollectionNames, IContest } from "@/types";
import { getCollectionElementById } from "@/lib/fetch/get/collections";
import ContestEditionNav from "./_components/ContestEditionNav";

type Props = {
    params: {
        collection: ICollectionNames,
        id: string
    },
    children: React.ReactNode
}


export default async function Layout({ params, children } : Props) {

    const { collection, id } = params

    const { data: contest } = await getCollectionElementById('contests', id) as { data: IContest }

    if (!contest) throw new Error(`No se encuentra item en '${ collection }' con la ID: ${ id }`)

    return (
        <section className="admin-page-content">
            <header>
                <h1>{ contest.name } <span className="font-thin">{ contest.year }</span></h1>
            </header>
            <ContestEditionNav id={ id }/>
            { children }
        </section>
    )
}
