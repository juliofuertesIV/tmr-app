import { Metadata } from "next";
import { ICollectionNames, IAllCollections } from "@/types";
import { getCollection } from "@/lib/fetch/get";
import CollectionTable from "@/lib/tables/CollectionTable";
import CreationDialog from "../_dashboard/CreationDialog";
import CreationModule from "./components/CreationModule";

export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
};

export default async function AdminElementPage({ params } : { params: { collection: ICollectionNames }}) {
    
    const { collection } = params

    const { data: items } = await getCollection(collection) as { data: IAllCollections[] }

    return (
        <div className="flex flex-col justify-start items-center w-full min-h-screen bg-neutral-950">
            <section className="flex flex-col gap-2 w-full max-w-2xl">
                <header className="py-8">
                    <h1 className="capitalize">{ collection }</h1>
                </header>
                <CreationModule collection={ collection }/>
                <CollectionTable collection={ collection } items={ items }/>
            </section>
        </div>
    )
}
