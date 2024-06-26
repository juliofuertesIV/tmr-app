import { Metadata } from "next";
import { ICollectionNames } from "@/types";
import { getModelByCollectionName, getRelationshipModelByName } from "@/app/api/[collection]/_utils";
import { ICollectionsWithAssociations, IRelationshipNames, IRelationship } from "@/types/associations";
import AssociationPageHeader from "../associate/[association]/_components/AssociationPageHeader";
import AssociationManager from "../associate/[association]/_components/AssociationManager";

export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
};

type Props = {
    params: { 
        collection: ICollectionNames,
        id: string,
        relationship: IRelationshipNames
    }
}

const getPageData = async ({ collection, id, relationship } : { collection: ICollectionNames, id: string, relationship: IRelationshipNames }) => {

    const { RelationshipModel } = getRelationshipModelByName(relationship)
    const { Model, options } = getModelByCollectionName(collection)

    const item = await Model.findOne({ where: { id }, ...options }).then(data => data) as unknown as ICollectionsWithAssociations
    const relationshipItems = await RelationshipModel.findAll({ order: [['name', 'ASC']]}).then(data => data) as unknown as IRelationship[]

    return { 
        item: JSON.parse(JSON.stringify(item)), 
        relationshipItems: JSON.parse(JSON.stringify(relationshipItems)) 
    }
}

export default async function AdminRelationshipPage({ params } : Props) {
    
    const { collection, id, relationship } = params

    const { item, relationshipItems } = await getPageData({ collection, relationship, id }) as { item: ICollectionsWithAssociations, relationshipItems: IRelationship[] }

    const { relationshipIdFieldName } = getRelationshipModelByName(relationship)

    return (
        <section className="w-full flex flex-col items-center">
            <AssociationPageHeader association={ relationship } item={ item }/>
            <AssociationManager 
                collection={ collection }
                collectionItem={ item } 
                association={ relationship }
                associationIdField={ relationshipIdFieldName }
                associationItems={ relationshipItems }
                associationKey={ null }
            />
        </section>
    )
}
