import { Metadata } from "next";
import { Contest, Inscription, Media } from '@/database/models';
import { IContest, IInscription } from "@/types";

export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
};

const getData = async ({ contestId } : { contestId: string }) => {

    const contest = await Contest.findOne({ where: { id: contestId }})
    .then((data: IContest | null) => data) 
    .catch((error: unknown) => {
        console.log(error);
        throw new Error(error as string)
    })

    const inscriptions = await Inscription.findAll({ where: { ContestId: contestId }, include: [ Media ]})
    .then((data: IInscription[] | null) => data)
    .catch((error: unknown) => {
        console.log(error);
        throw new Error(error as string)
    })

    return { contest, inscriptions }
}

export default async function AdminElementPage({ params } : { params: { id: string }}) {
    
    const { id: contestId } = params

    const { contest, inscriptions } = await getData({ contestId })

    if (!contest) throw new Error('No se ha encontrado el concurso en la base de datos.')

    if (!inscriptions) throw new Error('Error recuperando las inscripciones.')

        return (
            <section className="admin-page-content">
                <div className="flex flex-col gap-2 w-full">
                    {
                        inscriptions.map((inscription, index) => {
                            return (
                                <div
                                    className="border-2 bg-neutral-800 px-4 w-full"
                                    key={index}
                                >
                                    <div className="flex items-center gap-2 py-2">
                                        <div className="font-bold">{inscription.name}</div>
                                        <div className="uppercase italic text-sm">({inscription.city})</div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </section>
        );
}
