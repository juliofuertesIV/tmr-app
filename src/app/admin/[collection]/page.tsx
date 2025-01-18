import { Metadata } from "next";
import { ICollectionNames, IAllCollections } from "@/types";
import { getCollection } from "@/lib/fetch/get";
import CreationModule from "./_components/CreationModule";
import CollectionGrid from "./_components/CollectionGrid";

export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
};

export default async function AdminElementPage({ params } : { params: { collection: ICollectionNames }}) {
    
    const { collection } = params

    const { data: items } = await getCollection(collection) as { data: IAllCollections[] }

    return (
        <section className="admin-page-content">
            <header className="py-8">
                <h1 className="capitalize">{ collection }</h1>
            </header>
            <CreationModule collection={ collection }/>
            {/* <CollectionTable collection={ collection } items={ items }/> */}
            <CollectionGrid items={ items } collection={ collection }/>
        </section>
    )
}
