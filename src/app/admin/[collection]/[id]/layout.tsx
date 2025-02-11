import { CollectionNames } from "@/types";
import CollectionItemNav from "./_layout/CollectionItemNav";
import { getCollectionItemById } from "@/lib/fetch/get/collections";

type Props = {
    params: {
        collection: CollectionNames,
        id: string
    },
    children: React.ReactNode
}

export default async function Layout({ params, children } : Props) {
    
    const { collection, id } = params

    const { data: item } = await getCollectionItemById(collection, id)

    if (!item) throw new Error(`No se encuentra item en '${ collection }' con la ID: ${ id }`)

    return (
        <section className="admin-page-content">
            <header>
                <h1>{ item.name }</h1>
            </header>
            <CollectionItemNav collection={ collection } id={ id }/>
            { children }
        </section>
    )
}
