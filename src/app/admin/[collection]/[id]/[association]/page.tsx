import { Metadata } from "next";
import { IAssociationTypes, IBrand, IContest, IContestMedia, IContestState, IGenre, IOneOfAssociations, IOneOfCollectionNames, IOneOfCollectionsNamesWithAssociations, IOneOfCollectionsWithAssociations, IParam, ISocialMedia } from "@/interfaces";
import { getAssociationModelByName, getModelByCollectionName } from "@/app/api/[collection]/_utils";
import ContestParams from "@/app/admin/_collections/forms/contests/ContestParams";
import ContestStates from "@/app/admin/_collections/forms/contests/ContestStates";
import ContestMediaManager from "@/app/admin/_collections/forms/contests/ContestMediaManager";
import ContestBrands from "@/app/admin/_collections/forms/contests/ContestBrands";

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


const elementsByAssociationName = (item: IOneOfCollectionsWithAssociations, items: IOneOfAssociations[]) => {
    return {
        params: () => ContestParams({ contest: item as IContest, params: items as IParam[] }),
        states: () => ContestStates({ contest: item as IContest, states: items as IContestState[] }),
        brands: () => ContestBrands({ contest: item as IContest, brands: items as IBrand[] }),
        media: () => null, // throws error
        genres: null,
        social: null
    }
}


export default async function AdminAssociationPage({ params } : Props) {
    
    const { collection, id, association } = params

    const { item, associationItems } = await getPageData({ collection, association, id })

    const getElementByAssociationName = ({ association, associationItems } : { association: IAssociationTypes, associationItems: IOneOfAssociations[] }) => {

        if (association == 'genres' || association == 'social') return null
    
        return elementsByAssociationName(item, associationItems)[association]
    }

    const Element = getElementByAssociationName({ association, associationItems })

    if (!Element) {
        return (
            <p>
                { item.name } || { associationItems.map((item, index) => <span className="px-2" key={ index }>{ item.id }</span>) }
            </p>
        )
    }

    return (
        <Element/>
    )
}
