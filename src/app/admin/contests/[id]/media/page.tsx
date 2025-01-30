import { Metadata } from "next";
import { IContest } from "@/types";
import { IRelationship,  } from "@/types/associations";
import { Contest, Media } from "@/database/models";
import MediaFormWrapper from "@/app/admin/[collection]/[id]/associate/[association]/_components/MediaFormWrapper";
import AssociationPageHeader from "@/app/admin/[collection]/[id]/associate/[association]/_components/AssociationPageHeader";

export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
};

const getPageData = async ({ id } : { id: string }) => {

    const contest = await Contest.findOne({ where: { id }, include: [ Media ] }).then(data => data) as unknown as IContest

    return { 
        contest: JSON.parse(JSON.stringify(contest)), 
    }
}

export default async function ContestMediaPage({ params } : { params: { id: string }}) {
    
    const { id } = params

    const { contest } = await getPageData({ id }) as { contest: IContest, relationshipItems: IRelationship[] }

    return (
        <section className="w-full flex flex-col items-center">
            <AssociationPageHeader collection={ 'contests' } association={ 'media' } item={ contest }/>
            <MediaFormWrapper
                collection={ 'contests' }
                collectionItem={ contest }
                mediaFields={ [] } // TO DO: Media inputs et al
            />
        </section>
    )
}
