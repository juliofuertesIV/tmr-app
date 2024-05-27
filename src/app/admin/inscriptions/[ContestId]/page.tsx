import { Metadata } from "next";
import { getInscriptionsFromContestId } from "@/app/_fetch/get";
import CreateInscriptionForm from "./components/CreateInscriptionForm";

export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
};

export default async function AdminElementPage({ params } : { params: { ContestId: string }}) {
    
    const { ContestId } = params

    const { data } = await getInscriptionsFromContestId(ContestId)

    if (!data) throw new Error('No se ha encontrado el concurso en la base de datos.')

    const { contest, inscriptions } = data

    return (
        <div className="flex flex-col justify-start items-center w-full min-h-screen bg-neutral-950">
            <section className="flex flex-col gap-2 w-full max-w-2xl">
                <header className="py-8">
                    <h1 className="uppercase">INSCRIPCIONES DE { contest.name }</h1>
                </header>
                <CreateInscriptionForm contest={ contest }/>
            </section>
        </div>
    )
}
