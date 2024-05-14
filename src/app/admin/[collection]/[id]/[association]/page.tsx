import { Metadata } from "next";
import { IAssociationTypes, IOneOfAssociations, IOneOfCollectionNames, IOneOfCollectionsNamesWithAssociations, IOneOfCollectionsWithAssociations } from "@/interfaces";
import { getAssociationModelByName, getModelByCollectionName } from "@/app/api/[collection]/_utils";

export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
};

const getPageData = async ({ collection, id, association } : { collection: IOneOfCollectionNames, id: string, association: IAssociationTypes }) => {

    const { AssociationModel } = getAssociationModelByName(association)
    const { Model, options } = getModelByCollectionName(collection)

    const item = await Model.findOne({ where: { id }, ...options }).then(data => data) as unknown as IOneOfCollectionsWithAssociations
    const associationItems = await AssociationModel.findAll().then(data => data) as unknown as IOneOfAssociations[]

    return { item, associationItems }
}

type Props = {
    params: { 
        collection: IOneOfCollectionNames,
        id: string,
        association: IAssociationTypes 
    }
}

export default async function AdminElementPage({ params } : Props) {
    
    const { collection, id, association } = params

    const { item, associationItems } = await getPageData({ collection, association, id })

    return (
        <p>
            { item.name } || { associationItems.map((item, index) => <span className="px-2" key={ index }>{ item.id }</span>) }
        </p>
    )
}
