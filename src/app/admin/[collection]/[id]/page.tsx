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
        <AdminEditionForm item={ item }/>
    )
}
