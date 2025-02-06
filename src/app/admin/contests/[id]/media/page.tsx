import { Metadata } from "next";
import AssociationPageHeader from "@/app/admin/[collection]/[id]/associate/[association]/_components/AssociationPageHeader";
import ContestMediaManager from "./_components/ContestMediaManager";
import { getContestById } from "@/lib/fetch/get/contests";

export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
};

const getPageData = async ({ id } : { id: string }) => {

    return await getContestById({ id })
}

export default async function ContestMediaPage({ params } : { params: { id: string }}) {
    
    const { id } = params

    const { data: contest } = await getPageData({ id }) 

    if (!contest) throw new Error('No contest found!')

    console.log({ contest })

    return (
        <section className="w-full flex flex-col">
            <AssociationPageHeader collection={ 'contests' } association={ 'media' } item={ contest }/>
            <ContestMediaManager contest={ contest }/>
        </section>
    )
}
