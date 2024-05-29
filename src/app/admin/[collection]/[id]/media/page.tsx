import { Metadata } from "next";
import { IContest, IOneOfCollectionNames } from "@/types";
import { getModelByCollectionName } from "@/app/api/[collection]/_utils";
import ContestMediaManager from "@/forms/inputs/media/ContestMediaManager";
import FooterManager from "@/forms/inputs/media/FooterManager";

export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
};

type Props = {
    params: { 
        collection: IOneOfCollectionNames,
        id: string,
    }
}

const getPageData = async ({ collection, id } : { collection: IOneOfCollectionNames, id: string }) => {

    if (collection !== 'contests') throw new Error('This collection does not have media: ' + collection)

    const { Model, options } = getModelByCollectionName(collection)

    const item = await Model.findOne({ where: { id }, ...options }).then(data => data) as IContest
    
    return { 
        item: JSON.parse(JSON.stringify(item))
    }
}

export default async function AdminAssociationPage({ params } : Props) {
    
    const { collection, id } = params

    const { item } = await getPageData({ collection, id })

    return (
        <div className="overflow-y-scroll w-full max-h-screen">
            <section className="mb-16">
                <header className="max-w-2xl mb-8 mx-auto">
                    <h2 className="text-center">Gestor de imágenes</h2>
                </header>
                <ContestMediaManager contest={ item }/>
            </section>
            <section className="pb-16 mb-16">
                <header className="max-w-2xl mb-8 mx-auto">
                    <h2 className="text-center mt-4 mb-8">Gestor de imágenes del footer</h2>
                </header>
                <FooterManager contest={ item } />
            </section>
        </div>
    )
}
