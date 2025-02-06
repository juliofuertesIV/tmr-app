import { Metadata } from "next";
import { ICollectionNames } from "@/types";
import CreationModule from "./_components/CreationModule";
import CollectionGrid from "./_components/CollectionGrid";
import { getCollection } from "@/lib/fetch/get/collections";
import TagTypesGrid from "./_components/TagTypesGrid";

export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
};

const getGridByCollectionName = (collection: ICollectionNames) => {

    const gridByCollection = {
        brands: CollectionGrid,
        social: CollectionGrid,
        genres: CollectionGrid,
        managers: CollectionGrid,
        sponsors: CollectionGrid,
        tagtypes: TagTypesGrid
    }

    return gridByCollection[collection]
}

export default async function AdminElementPage({ params } : { params: { collection: ICollectionNames }}) {
    
    const { collection } = params

    const { data: items } = await getCollection(collection) 

    if (!items) return null

    const ItemGrid = getGridByCollectionName(collection)

    return (
        <section className="admin-page-content">
            <header className="py-8">
                <h1 className="capitalize">{ collection } (UPDATE)</h1>
            </header>
            <CreationModule collection={ collection }/>
            <ItemGrid items={ items } collection={ collection }/>
        </section>
    )
}
