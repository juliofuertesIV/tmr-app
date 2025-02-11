import { Metadata } from "next";
import { CollectionNames } from "@/types";
import CollectionItemFormModule from "./_components/CollectionItemFormModule";
import { getCollectionItemById } from "@/lib/fetch/get/collections";
import DeleteItemDialog from "./_components/DeleteItemDialog";

export const metadata: Metadata = {
    title: "TMR | Perfil",
    description: "El buen admin panel"
};

export default async function AdminElementPage({ params } : { params: { collection: CollectionNames, id: string }}) {
    
    const { collection, id } = params

    const { data: item } = await getCollectionItemById(collection, id)

    if (!item) throw new Error('No se ha encontrado el elemento en la base de datos.')

    return (
        <>
            <CollectionItemFormModule collection={ collection } collectionItem={ item } />
            <DeleteItemDialog collection={ collection } collectionItem={ item }/>
        </>
    )
}
