import { ICollectionNames } from "@/types";
import CollectionItemNav from "./_layout/CollectionItemNav";
import { getCollectionElementById } from "@/lib/fetch/get";

type Props = {
    params: {
        collection: ICollectionNames,
        id: string
    },
    children: React.ReactNode
}

export default async function Layout({ params, children } : Props) {

    
    const { collection, id } = params

    const { data: item } = await getCollectionElementById(collection, id)

    if (!item) throw new Error(`No se encuentra item en '${ collection }' con la ID: ${ id }`)

    return (
        <section className="admin-page-content">
            <header>
                <h1>{ item.name } { collection === 'contests' && <span className="font-thin">{ item.year }</span>}</h1>
            </header>
            <CollectionItemNav collection={ collection } id={ id }/>
            { children }
        </section>
    )
}
