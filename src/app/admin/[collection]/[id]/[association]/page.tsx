import { Metadata } from "next";
import { IAssociationTypes, IOneOfAssociations, IOneOfCollectionNames, IOneOfCollectionsWithAssociations } from "@/types";
import { getAssociationModelByName, getModelByCollectionName } from "@/app/api/[collection]/_utils";
import AssociationManager from "./_components/AssociationManager";
import { getAssociationOptionsByName } from "./_utils";

export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
};

type Props = {
    params: { 
        collection: IOneOfCollectionNames,
        id: string,
        association: IAssociationTypes 
    }
}

const getPageData = async ({ collection, id, association } : { collection: IOneOfCollectionNames, id: string, association: IAssociationTypes }) => {

    const { AssociationModel } = getAssociationModelByName(association)
    const { Model, options } = getModelByCollectionName(collection)

    const item = await Model.findOne({ where: { id }, ...options }).then(data => data) as unknown as IOneOfCollectionsWithAssociations
    const associationItems = await AssociationModel.findAll({ order: [['name', 'ASC']]}).then(data => data) as unknown as IOneOfAssociations[]

    return { 
        item: JSON.parse(JSON.stringify(item)), 
        associationItems: JSON.parse(JSON.stringify(associationItems)) 
    }
}

export default async function AdminAssociationPage({ params } : Props) {
    
    const { collection, id, association } = params

    const { item, associationItems } = await getPageData({ collection, association, id })

    const { associationKey, isManyToMany } = getAssociationOptionsByName(association)

    return (
        <AssociationManager 
            collection={ collection }
            collectionItem={ item } 
            association={ association }
            associationItems={ associationItems }
            associationKey={ associationKey }
            isManyToMany={ isManyToMany }
        />
    )
}
