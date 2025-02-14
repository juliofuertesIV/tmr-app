import { Metadata } from "next";
import { getContestInscriptions } from "@/lib/fetch/get/inscriptions";
import AdminInscriptionCard from "./_components/AdminInscriptionCard";
import { getContestInscriptionsFromDatabase, getContestInscriptionsPageData } from "./_functions";

export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
};

export default async function ContestInscriptionsPage({ params } : { params: { id: string }}) {
    
    const { id: contestId } = params

    const inscriptions = await getContestInscriptionsPageData({ contestId })

    if (!inscriptions) throw new Error('No se ha encontrado el concurso en la base de datos.')

    return (
        <section>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-7xl">
                {
                    inscriptions.map((inscription, index) => {
                        return <AdminInscriptionCard inscription={ inscription } key={ index }/>
                    })
                }
            </div>
        </section>
    );
}
