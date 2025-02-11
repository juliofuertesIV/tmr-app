import { Metadata } from "next";
import { IContestRelationshipNames } from "@/types/contests";
import { getContestRelationshipPageData } from "./_functions";
import ContestRelationshipManager from "./_components/ContestRelationshipManager";

export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
};

type Props = {
    params: { 
        id: string,
        relationship: IContestRelationshipNames
    }
}

export default async function ContestRelationshipPage({ params } : Props) {
    
    const { id, relationship } = params

    const { contest, relationshipItems, relationshipIdFieldName } = await getContestRelationshipPageData({ relationship, id })    

    return (
        // TO DO: Header (description)
        <ContestRelationshipManager
            contest={ contest }
            relationshipIdField={ relationshipIdFieldName }
            relationshipItems={ relationshipItems }
        />
    )
}
