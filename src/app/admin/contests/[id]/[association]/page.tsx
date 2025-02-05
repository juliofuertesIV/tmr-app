import { Metadata } from "next";
import ContestAssociationManager from "./_components/ContestAssociationManager";
import { IContestAssociationIdFieldNames, IContestAssociationKeys, IContestAssociationNames, IContestAssociations } from "@/types/associations";
import ContestAssociationPageHeader from "./_components/ContestAssociationPageHeader";
import { getContestAndAssociation } from "@/lib/fetch/get/contests";
import { getAssociationKeyAndIdFieldByName } from "./_functions";

export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
};

type Props = {
    params: { 
        id: string,
        association: IContestAssociationNames
    }
}

const getData = async ({ id, association } : { id: string, association: IContestAssociationNames }) => {

    try { 
        const { data, error } = await getContestAndAssociation({ id, association })

        return { contest: data?.contest, associationItems: data?.associationItems, error }
    }
    catch (error) {
        throw new Error(error as string)
    }

}

export default async function AdminAssociationPage({ params } : Props) {
    
    const { id, association } = params

    const { associationKey, associationIdField } = getAssociationKeyAndIdFieldByName({ associationName: association })

    const { contest, associationItems, error } = await getData({ id, association })

    if (error) return (
        <section className="admin-page-content">
            <div>
                <h1>Error :\</h1>
                <p>{ error.message }</p>
            </div>
        </section>
    )

    if (!contest || !associationItems) return null

    return (
        <section className="admin-page-content">
            <ContestAssociationPageHeader association={ association } contest={ contest }/>
            <ContestAssociationManager 
                contest={ contest } 
                association={ association as IContestAssociationNames }
                associationItems={ associationItems }
                associationKey={ associationKey as IContestAssociationKeys }
                associationIdField={ associationIdField as IContestAssociationIdFieldNames }
            />
        </section>
    )
}
