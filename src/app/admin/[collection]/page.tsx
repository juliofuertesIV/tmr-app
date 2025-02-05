import { Metadata } from "next";
import { ICollectionNames, IAllCollections } from "@/types";
import CreationModule from "./_components/CreationModule";
import CollectionGrid from "./_components/CollectionGrid";
import { getCollection } from "@/lib/fetch/get/collections";

export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
};

export default async function AdminElementPage({ params } : { params: { collection: ICollectionNames }}) {
    
    const { collection } = params

    const { data: items } = await getCollection(collection) 

    if (!items) return null

    return (
        <section className="admin-page-content">
            <header className="py-8">
                <h1 className="capitalize">{ collection }</h1>
            </header>
            <CreationModule collection={ collection }/>
            <CollectionGrid items={ items } collection={ collection }/>
        </section>
    )
}
