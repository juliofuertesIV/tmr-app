import { Metadata } from "next";
import { ICollectionsWithMedia } from "@/types";
import AssociationManager from "./_components/AssociationManager";
import { IAssociationNames, ICollectionsWithAssociationsNames, IMedialessAssociation, IMedialessAssociationIdFieldnames, IMedialessAssociationKeys, IMedialessAssociationNames, IMedialessRelationshipIdFieldnames } from "@/types/associations";
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
        collection: ICollectionsWithAssociationsNames,
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
                <AssociationPageHeader association={ association } item={ item } collection={ collection }/>
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
            <AssociationPageHeader association={ association } item={ item } collection={ collection }/>
            <AssociationManager 
                collection={ collection }
                collectionItem={ item } 
                association={ association as IMedialessAssociationNames }
                associationItems={ associationItems as IMedialessAssociation[] }
                associationKey={ associationKey as IMedialessAssociationKeys }
                associationIdField={ associationIdField as IMedialessAssociationIdFieldnames }
            />
        </section>
    )
}
