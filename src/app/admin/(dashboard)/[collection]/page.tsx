import { Metadata } from "next";
import { CollectionNames } from "@/types";
import CreationModule from "./_components/CreationModule";
import { getGridByCollectionName, getPageTitleByCollection } from "./_functions";
import { getCollectionFromDatabase } from "@/lib/database/functions/collections";

export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
};

const getCollectionPageData = async ({ collectionName } : { collectionName: CollectionNames }) => {

    const items = await getCollectionFromDatabase({ collectionName })

    return JSON.parse(JSON.stringify(items))
}

export default async function AdminElementPage({ params } : { params: { collection: CollectionNames }}) {
    
    const { collection } = params

    const items = await getCollectionPageData({ collectionName: collection }) 

    const ItemGrid = getGridByCollectionName(collection)

    return (
        <section className="admin-page-content">
            <header className="pb-4">
                <h1 className="capitalize">{ getPageTitleByCollection(collection) }</h1>
            </header>
            <CreationModule collection={ collection }/>
            <ItemGrid items={ items } collection={ collection }/>
        </section>
    )
}
