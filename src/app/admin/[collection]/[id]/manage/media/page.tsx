import { Metadata } from "next";
import { ICollectionNames } from "@/types";
import { getCollectionElementById } from "@/lib/fetch/get";
import MediaModule from "./_components/MediaModule";

export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
};

export default async function AdminElementPage({ params } : { params: { collection: ICollectionNames, id: string }}) {
    
    const { collection, id } = params

    const { data: item } = await getCollectionElementById(collection, id)

    if (!item) throw new Error('No se ha encontrado el elemento en la base de datos.')

    return (
        <section className="w-full flex flex-col items-center">
            <header className="text-center max-w-2xl mb-8">
                <h1 className="uppercase">Imágenes</h1>
            </header>
            <MediaModule collection={ collection } collectionItem={ item }/>
        </section>
    )
}
