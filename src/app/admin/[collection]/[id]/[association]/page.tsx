import { Metadata } from "next";
import { ICollectionNames } from "@/types";
import { getAssociationModelByName, getModelByCollectionName } from "@/app/api/[collection]/_utils";
import AssociationManager from "./_components/AssociationManager";
import { getAssociationOptionsByName } from "./_utils";
import { IAssociationNames, IAssociations, ICollectionsWithAssociations } from "@/types/associations";
import AssociationPageHeader from "./_components/AssociationPageHeader";

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

const getPageData = async ({ collection, id, association } : { collection: ICollectionNames, id: string, association: IAssociationNames }) => {

    const { AssociationModel } = getAssociationModelByName(association)
    const { Model, options } = getModelByCollectionName(collection)

    const item = await Model.findOne({ where: { id }, ...options }).then(data => data) as unknown as ICollectionsWithAssociations
    const associationItems = await AssociationModel.findAll({ order: [['name', 'ASC']]}).then(data => data) as unknown as IAssociations[]

    return { 
        item: JSON.parse(JSON.stringify(item)), 
        associationItems: JSON.parse(JSON.stringify(associationItems)) 
    }
}

export default async function AdminAssociationPage({ params } : Props) {
    
    const { collection, id, association } = params

    const { item, associationItems } = await getPageData({ collection, association, id }) as { item: ICollectionsWithAssociations, associationItems: IAssociations[] }

    const { associationKey, isManyToMany } = getAssociationOptionsByName(association)

    return (
        <section className="w-full flex flex-col items-center">
            <AssociationPageHeader association={ association } item={ item }/>
            <AssociationManager 
                collection={ collection }
                collectionItem={ item } 
                association={ association }
                associationItems={ associationItems }
                associationKey={ associationKey }
                isManyToMany={ isManyToMany }
            />
        </section>
    )
}
