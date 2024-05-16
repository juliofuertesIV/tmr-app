import { Metadata } from "next";
import { IAssociationTypes, IOneOfAssociations, IOneOfCollectionNames, IOneOfCollectionsWithAssociations } from "@/interfaces";
import { getAssociationModelByName, getModelByCollectionName } from "@/app/api/[collection]/_utils";
import AssociationManager from "@/app/admin/_collections/forms/contests/AssociationManager";
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
    const associationItems = await AssociationModel.findAll().then(data => data) as unknown as IOneOfAssociations[]

    return { item, associationItems }
}
/* const getComponentByAssociationName = (item: IOneOfCollectionsWithAssociations, items: IOneOfAssociations[]) => {
    return {
        params: () => ParamsManager({ contest: item as IContest, params: items as IParam[] }),
        states: () => StateManager({ contest: item as IContest, states: items as IContestState[] }),
        brands: () => BrandManager({ contest: item as IContest, brands: items as IBrand[] }),
        genres: () => GenreManager({ contest: item as IContest, genres: items as IGenre[] }),
        social: null
    }
} */


export default async function AdminAssociationPage({ params } : Props) {
    
    const { collection, id, association } = params

    const { item, associationItems } = await getPageData({ collection, association, id })
/* 
    const ComponentByAssociationName = ({ association, associationItems } : { association: IAssociationTypes, associationItems: IOneOfAssociations[] }) => {   
        return getComponentByAssociationName(item, associationItems)[association]
    }

    const AssociationManager = ComponentByAssociationName({ association, associationItems })

    if (!AssociationManager) {
        return (
            <p>
                { item.name } || { associationItems.map((item, index) => <span className="px-2" key={ index }>{ item.id }</span>) }
            </p>
        )
    }
 */
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
