import { Metadata } from "next";
import { IOneOfCollectionNames } from "@/interfaces";
import { getCollection } from "@/app/_fetch/get";
import CollectionSection from "../_dashboard/layout/CollectionSection";
import CollectionGrid from "../_dashboard/layout/CollectionGrid";

export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
};

export default async function AdminElementPage({ params } : { params: { collection: IOneOfCollectionNames }}) {
    
    const { collection } = params

    const { data: items } = await getCollection(collection)

    return (
        <main className="flex min-h-screen flex-col">
            <CollectionSection collection={ collection } title={ collection } onManageDialog={ null }>
                <CollectionGrid items={ items } collection={ collection }/>
            </CollectionSection>
        </main>
    )
}
