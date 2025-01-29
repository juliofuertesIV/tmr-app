import { Metadata } from "next";
import Image from "next/image";
import { getContestInscriptions } from "@/lib/fetch/get/inscriptions";

export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
};

const getData = async ({ contestId } : { contestId: string }) => {

    const { data } = await getContestInscriptions(contestId)

    if (!data) throw new Error('Error en los datos devueltos por el servidor.')

    const { contest, inscriptions } = data

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
                                    className="border-2 bg-neutral-800 p-2 px-4 w-full max-w-lg flex justify-between"
                                    key={index}
                                >
                                    <div className="flex flex-col gap-2 py-2 h-full justify-center">
                                        <div className="font-bold text-xl">{ inscription.name }</div>
                                        <div className="italic text-sm">({ inscription.city })</div>
                                        <div className="uppercase italic text-sm">{ inscription.genre }</div>
                                    </div>
                                    <div className="flex w-full max-w-24 max-h-24 rounded-full overflow-hidden border-2 border-neutral-950 bg-neutral-900">
                                        <Image
                                            className="flex max-w-full max-h-full object-cover"
                                            src={ inscription.Medium.src }
                                            width={ parseInt(inscription.Medium.width) }
                                            height={ parseInt(inscription.Medium.height) }
                                            alt={ inscription.Medium.alt }
                                        />
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </section>
        );
}
