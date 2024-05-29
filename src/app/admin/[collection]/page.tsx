import { Metadata } from "next";
import { IOneOfCollectionNames, IOneOfCollections } from "@/types";
import { getCollection } from "@/fetch/get";
import CreationDialog from "../_dashboard/CreationDialog";
import CollectionTable from "./_components/tables/CollectionTable";

export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
};

export default async function AdminElementPage({ params } : { params: { collection: IOneOfCollectionNames }}) {
    
    const { collection } = params

    const { data: items } = await getCollection(collection) as { data: IOneOfCollections[] }

    const canAddToCollection = ['contests', 'brands', 'genres'].includes(collection)

    return (
        <div className="flex flex-col justify-start items-center w-full min-h-screen bg-neutral-950">
            <section className="flex flex-col gap-2 w-full max-w-2xl">
                <header className="py-8">
                    <h1 className="capitalize">{ collection }</h1>
                </header>
                {
                    canAddToCollection && <CreationDialog collection={ collection }/>
                }
                <CollectionTable collection={ collection } items={ items }/>
            </section>
        </div>
    )
}
