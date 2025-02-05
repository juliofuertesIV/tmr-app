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

export default async function AdminAssociationPage({ params } : Props) {
    
    const { id, association } = params

    const { associationKey, associationIdField } = getAssociationKeyAndIdFieldByName({ associationName: association })

    const { data } = await getContestAndAssociation({ id, association })

    if (!data) throw new Error('Error fetching shit.')

    const { contest, associationItems } = data

    return (
        <section className="w-full flex flex-col items-center">
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
