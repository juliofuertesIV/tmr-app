import { Metadata } from "next";
import { IAssociationTypes, IOneOfAssociations, IOneOfCollectionNames, IOneOfCollectionsWithAssociations } from "@/types";
import { getAssociationModelByName, getModelByCollectionName } from "@/app/api/[collection]/_utils";

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

    
    const { Model, options } = getModelByCollectionName(collection)

    const item = await Model.findOne({ where: { id }, ...options }).then(data => data) as unknown as IOneOfCollectionsWithAssociations
    
    return { 
        item: JSON.parse(JSON.stringify(item))
    }
}

export default async function AdminAssociationPage({ params } : Props) {
    
    const { collection, id } = params

    const { item } = await getPageData({ collection, id })

    return (
        <p>Media</p>
    )
}
