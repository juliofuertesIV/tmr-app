import { Metadata } from "next";
import { ICollectionNames } from "@/types";
import { getCollectionElementById } from "@/lib/fetch/get";
import MediaFormWrapper from "./_components/MediaFormWrapper";
import { ICollectionsWithMediaNames } from "@/types/media";
import { getFormByCollectionName, getMediaFieldsByCollection } from "@/lib/forms/collection";

export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
};

export default async function AdminElementPage({ params } : { params: { collection: ICollectionNames, id: string }}) {
    
    const { collection, id } = params

    const { data: item } = await getCollectionElementById(collection, id)

    if (!item) throw new Error('No se ha encontrado el elemento en la base de datos.')

    const mediaFields = getMediaFieldsByCollection({ collection })

    const { action } = getFormByCollectionName({ collection, actionTarget: 'update' })

    return (
        <section className="w-full flex flex-col items-center">
            <header className="text-center max-w-2xl mb-8">
                <h1 className="uppercase">Editar imágenes y archivos</h1>
            </header>
            <MediaFormWrapper
                collection={ collection as ICollectionsWithMediaNames }
                collectionItem={ item }
                mediaFields={ mediaFields }
                action={ action }
            />
        </section>
    )
}
