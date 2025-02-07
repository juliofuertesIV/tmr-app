import { Metadata } from "next";
import { Contest } from "@/database/models";
import { IContestRelationshipNames } from "@/types/contests";
import { getContestRelationshipModelByName } from "./_functions";
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

const getPageData = async ({ id, relationship } : { id: string, relationship: IContestRelationshipNames }) => {

    const { RelationshipModel, options: relationshipOptions } = getContestRelationshipModelByName(relationship)
    
    const contest = await Contest.findOne({ where: { id }, include: [RelationshipModel] }).then(data => data)
    const relationshipItems = await RelationshipModel.findAll({ ...relationshipOptions }).then(data => data)

    return { 
        contest: JSON.parse(JSON.stringify(contest)), 
        relationshipItems: JSON.parse(JSON.stringify(relationshipItems)) 
    }
}

export default async function ContestRelationshipPage({ params } : Props) {
    
    const { id, relationship } = params

    const { contest, relationshipItems } = await getPageData({ relationship, id }) 

    const { relationshipIdFieldName } = getContestRelationshipModelByName(relationship)

    return (
        // TO DO: Header (description)
        <ContestRelationshipManager
            contest={ contest }
            relationshipIdField={ relationshipIdFieldName }
            relationshipItems={ relationshipItems }
        />
    )
}
