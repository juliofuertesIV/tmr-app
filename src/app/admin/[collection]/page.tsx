import { Metadata } from "next";
import AdminCreationForm from "../_forms/AdminCreationForm";
import { getCreationformByCollectionName } from "../_forms";
import { IOneOfCollectionNames } from "@/interfaces";

export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
};

export default function Home({ params } : { params: { collection: IOneOfCollectionNames }}) {
    
    const { collection } = params

    const { action, fields } = getCreationformByCollectionName({ collection })

    return (
        <main className="flex min-h-screen flex-col">
            <header className="flex py-8 justify-center">
                <h1 className="uppercase">{ collection }</h1>
            </header>
            <div className="w-full max-w-xl mx-auto">
                <h2 className="uppercase my-4">Añadir</h2>
                <AdminCreationForm action={ action } fields={ fields } collection={ collection }/>
            </div>
        </main>
    )
}
