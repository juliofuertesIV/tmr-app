import { Metadata } from "next";
import { getModelByCollectionName } from "@/app/api/protected/contests/[id]/[association]/_utils";
import AssociationPageHeader from "../associate/[association]/_components/AssociationPageHeader";
import AssociationManager from "../associate/[association]/_components/AssociationManager";
import { CollectionNames } from "@/types";

export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
};

type Props = {
    params: { 
        collection: CollectionNames,
        id: string,
        relationship: string
    }
}

/* const getPageData = async ({ collection, id, relationship } : { collection: ICollectionsWithAssociationsNames, id: string, relationship: IContestRelationshipNames }) => {

    const { RelationshipModel, options: relationshipOptions } = getRelationshipModelByName(relationship)
    const { Model, options } = getModelByCollectionName(collection)

    const item = await Model.findOne({ where: { id }, ...options }).then(data => data) as unknown as ICollectionsWithAssociations
    const relationshipItems = await RelationshipModel.findAll({ ...relationshipOptions }).then(data => data) as unknown as IContestRelationship[]

    return { 
        item: JSON.parse(JSON.stringify(item)), 
        relationshipItems: JSON.parse(JSON.stringify(relationshipItems)) 
    }
} */

export default async function AdminRelationshipPage({ params } : Props) {
    
/*     const { collection, id, relationship } = params

    const { item, relationshipItems } = await getPageData({ collection, relationship, id }) 

    const { relationshipIdFieldName } = getRelationshipModelByName(relationship)

    if (relationship === 'media') {

        return null

    } */

    return (
        <section className="w-full flex flex-col items-center">
            {/* <AssociationPageHeader collection={ collection } association={ relationship } item={ item }/>
            <AssociationManager 
                collection={ collection }
                collectionItem={ item } 
                association={ relationship }
                associationIdField={ relationshipIdFieldName as IMedialessAssociationIdFieldnames }
                associationItems={ relationshipItems as IMedialessAssociation[] | IMedialessRelationship[] }
                associationKey={ null }
            /> */}
        </section>
    )
}
