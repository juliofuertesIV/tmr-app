import { Metadata } from "next";
import { ICollectionNames, ICollectionsWithMedia } from "@/types";
import { getAssociationModelByName, getModelByCollectionName } from "@/app/api/[collection]/_utils";
import AssociationManager from "./_components/AssociationManager";
import { IAssociationIdFieldnames, IAssociationKeys, IAssociationNames, IAssociation, ICollectionsWithAssociations } from "@/types/associations";
import AssociationPageHeader from "./_components/AssociationPageHeader";
import { getMediaFieldsByCollection } from "@/lib/forms/collection";
import { ICollectionsWithMediaNames } from "@/types/media";
import MediaFormWrapper from "./_components/MediaFormWrapper";
import { getCollectionElementAndAssociationsById } from "@/lib/fetch/get";

export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
};

type Props = {
    params: { 
        collection: ICollectionNames,
        id: string,
        association: IAssociationNames 
    }
}

export default async function AdminAssociationPage({ params } : Props) {
    
    const { collection, id, association } = params

    const { data } = await getCollectionElementAndAssociationsById(collection, id, association)

    if (!data) throw new Error('Error fetching shit.')

    const { item, associationItems, associationIdField, associationKey } = data

    if (association === 'media') {

        const mediaFields = getMediaFieldsByCollection({ collection })

        return (
            <section className="w-full flex flex-col items-center">
                <AssociationPageHeader association={ association } item={ item }/>
                <MediaFormWrapper
                    collection={ collection as ICollectionsWithMediaNames }
                    collectionItem={ item as ICollectionsWithMedia }
                    mediaFields={ mediaFields }
                />
            </section>
        )

    }

    return (
        <section className="w-full flex flex-col items-center">
            <AssociationPageHeader association={ association } item={ item }/>
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
