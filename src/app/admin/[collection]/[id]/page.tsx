import { Metadata } from "next";
import { ICollectionNames } from "@/types";
import { getCollectionElementById } from "@/lib/fetch/get";
import CollectionItemFormModule from "./_components/CollectionItemFormModule";

export const metadata: Metadata = {
    title: "TMR | Perfil",
    description: "El buen admin panel"
};

export default async function AdminElementPage({ params } : { params: { collection: ICollectionNames, id: string }}) {
    
    const { collection, id } = params

    

    const { data: item } = await getCollectionElementById(collection, id)

    const result = await getCollectionElementById(collection, id)
    console.log({ result })

    

    if (!item) throw new Error('No se ha encontrado el elemento en la base de datos.')

    return <CollectionItemFormModule collection={ collection } collectionItem={ item } target={ 'update' }/>
}
