import { Metadata } from "next";
import { getCollectionElementById } from "@/lib/fetch/get";
import CreateInscriptionForm from "./_components/CreateInscriptionForm";
import Image from "next/image";
import { Inscription, Media } from "@/lib/database";
import { IInscription } from "@/types";

export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
};

const getInscriptions = async ({ ContestId } : { ContestId: string }) : Promise<IInscription[] | Error> => {
    const inscriptions = await Inscription.findAll({ include: [Media], where: { ContestId }})
    .then(data => JSON.parse(JSON.stringify(data)))
    .catch((error: unknown) => new Error(error as string)) 

    return inscriptions
}

export default async function AdminElementPage({ params } : { params: { contestId: string }}) {
    
    const { contestId: ContestId } = params

    const { data: contest } = await getCollectionElementById('contests', ContestId)

    const inscriptions = await getInscriptions({ ContestId })

    if (!contest) throw new Error('No se ha encontrado el concurso en la base de datos.')

    if (inscriptions instanceof Error) throw new Error('Error recuperando las inscripciones.')

    return (
        <div className="flex flex-col justify-start items-center w-full min-h-screen bg-neutral-950">
            <section className="flex flex-col gap-2 w-full max-w-2xl">
                <header className="py-8">
                    <h1 className="uppercase">INSCRIPCIONES DE { contest.name }</h1>
                </header>
                <CreateInscriptionForm contest={ contest } />
                {
                    inscriptions.map((inscription, index) => {
                        
                        if (!inscription.Medium) return null

                        return (
                            <div 
                                className="bg-pink-400 p-4"
                                key={ index }
                            >
                                <Image 
                                    src={ inscription.Medium.src }
                                    alt={ inscription.Medium.alt }
                                    width={ parseInt(inscription.Medium.width) }
                                    height={ parseInt(inscription.Medium.height )}
                                />
                                
                                { inscription.name }
                            </div>
                        )
                    })
                }
            </section>

        </div>
    )
}
