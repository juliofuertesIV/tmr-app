import { CollectionNames } from "@/types";
import CollectionItemNav from "./_layout/CollectionItemNav";
import { getCollectionItemFromDatabase } from "@/lib/database/functions/collections";

type Props = {
    params: {
        collection: CollectionNames,
        id: string
    },
    children: React.ReactNode
}

export default async function Layout({ params, children } : Props) {
    
    const { collection, id } = params

    const item = await getCollectionItemFromDatabase({ collectionName: collection, id })

    if (!item) throw new Error(`No se encuentra item en '${ collection }' con la ID: ${ id }`)

    return (
        <section className="admin-page-content">
            <CollectionItemNav collection={ collection } id={ id }/>
            { children }
        </section>
    )
}
