import { Metadata } from "next";
import AssociationManager from "./_components/AssociationManager";
import { AssociationNames, CollectionsWithAssociationNames } from "@/types/associations";
import AssociationPageHeader from "./_components/AssociationPageHeader";
import { getCollectionAssociationPageData } from "./_functions";

export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
};

type Props = {
    params: { 
        collection: CollectionsWithAssociationNames,
        id: string,
        association: AssociationNames 
    }
}

export default async function CollectionAssociationPage({ params } : Props) {
    
    const { collection, id, association } = params

    const data = await getCollectionAssociationPageData({ collection, id, association })

    const { item, associationItems, associationIdField, associationKey } = data

    return (
        <section className="w-full flex flex-col">
            <AssociationPageHeader association={ association } item={ item } collection={ collection }/>
            <AssociationManager 
                collection={ collection }
                collectionItem={ item } 
                association={ association }
                associationItems={ associationItems }
                associationKey={ associationKey }
                associationIdField={ associationIdField }
            />
        </section>
    )
}
