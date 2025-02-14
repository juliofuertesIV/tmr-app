import { Metadata } from "next";
import AssociationPageHeader from "@/app/admin/(dashboard)/[collection]/[id]/associate/[association]/_components/AssociationPageHeader";
import ContestMediaManager from "./_components/ContestMediaManager";
import { getContestFromDatabaseById } from "@/lib/database/functions/contests";

export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
};

const getPageData = async ({ id } : { id: string }) => {

    const contest = await getContestFromDatabaseById({ id, scope: 'detailed' })

    return JSON.parse(JSON.stringify(contest))
}

export default async function ContestMediaPage({ params } : { params: { id: string }}) {
    
    const { id } = params

    const contest = await getPageData({ id }) 

    if (!contest) throw new Error('No contest found!')

    return (
        <section className="w-full flex flex-col">
            <AssociationPageHeader collection={ 'contests' } association={ 'media' } item={ contest }/>
            <ContestMediaManager contest={ contest }/>
        </section>
    )
}
