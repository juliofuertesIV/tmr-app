import { Metadata } from "next";
import { IOneOfCollectionNames } from "@/types";
import { getCollectionElementById } from "@/app/_fetch/get";
import AdminEditionForm from "../../_collections/forms/EditionForm";

export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
};

export default async function AdminElementPage({ params } : { params: { collection: IOneOfCollectionNames, id: string }}) {
    
    const { collection, id } = params

    const { data: item } = await getCollectionElementById(collection, id)

    if (!item) throw new Error('No se ha encontrado el elemento en la base de datos.')

    return (
        <section className="w-full flex flex-col items-center">
            <header className="text-center max-w-2xl mb-8">
                <h1 className="uppercase">Editar información básica</h1>
            </header>
            <AdminEditionForm item={ item }/>
        </section>
    )
}
