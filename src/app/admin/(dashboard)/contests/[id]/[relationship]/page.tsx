import { Metadata } from "next";
import { ContestRelationshipNames } from "@/types/contests";
import { getContestRelationshipPageData } from "./_functions";

export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
};

type Props = {
    params: { 
        id: string,
        relationship: ContestRelationshipNames
    }
}

export default async function ContestRelationshipPage({ params } : Props) {
    
    const { id, relationship } = params

    const { 
        contest, 
        relationshipItems, 
        relationshipIdFieldName, 
        Manager 
    } = await getContestRelationshipPageData({ relationship, id })    

    return (
        <Manager
            contest={ contest }
            relationshipIdField={ relationshipIdFieldName }
            relationshipItems={ relationshipItems }

        />
    )
}
