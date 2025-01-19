import { Metadata } from "next";
import { ICollectionsWithMedia } from "@/types";
import { getModelByCollectionName, getRelationshipModelByName } from "@/app/api/[collection]/_utils";
import { ICollectionsWithAssociations, IRelationshipNames, IRelationship, IMedialessAssociationIdFieldnames, IMedialessAssociation, IMedialessRelationship, ICollectionsWithAssociationsNames } from "@/types/associations";
import AssociationPageHeader from "../associate/[association]/_components/AssociationPageHeader";
import AssociationManager from "../associate/[association]/_components/AssociationManager";
import { getMediaFieldsByCollection } from "@/lib/forms/collection";
import MediaFormWrapper from "../associate/[association]/_components/MediaFormWrapper";
import { ICollectionsWithMediaNames } from "@/types/media";

export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
};

type Props = {
    params: { 
        collection: ICollectionsWithAssociationsNames,
        id: string,
        relationship: IRelationshipNames
    }
}

const getPageData = async ({ collection, id, relationship } : { collection: ICollectionsWithAssociationsNames, id: string, relationship: IRelationshipNames }) => {

    const { RelationshipModel, options: relationshipOptions } = getRelationshipModelByName(relationship)
    const { Model, options } = getModelByCollectionName(collection)

    const item = await Model.findOne({ where: { id }, ...options }).then(data => data) as unknown as ICollectionsWithAssociations
    const relationshipItems = await RelationshipModel.findAll({ ...relationshipOptions }).then(data => data) as unknown as IRelationship[]

    return { 
        item: JSON.parse(JSON.stringify(item)), 
        relationshipItems: JSON.parse(JSON.stringify(relationshipItems)) 
    }
}

export default async function AdminRelationshipPage({ params } : Props) {
    
    const { collection, id, relationship } = params

    const { item, relationshipItems } = await getPageData({ collection, relationship, id }) as { item: ICollectionsWithAssociations, relationshipItems: IRelationship[] }

    const { relationshipIdFieldName } = getRelationshipModelByName(relationship)

    if (relationship === 'media') {

        const mediaFields = getMediaFieldsByCollection({ collection })

        return (
            <section className="w-full flex flex-col items-center">
                <AssociationPageHeader collection={ collection } association={ relationship } item={ item }/>
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
            <AssociationPageHeader collection={ collection } association={ relationship } item={ item }/>
            <AssociationManager 
                collection={ collection }
                collectionItem={ item } 
                association={ relationship }
                associationIdField={ relationshipIdFieldName as IMedialessAssociationIdFieldnames }
                associationItems={ relationshipItems as IMedialessAssociation[] | IMedialessRelationship[] }
                associationKey={ null }
            />
        </section>
    )
}
