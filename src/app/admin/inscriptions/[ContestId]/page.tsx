import { Metadata } from "next";
import { getCollection, getCollectionElementById } from "@/fetch/get";
import CreateInscriptionForm from "./_components/CreateInscriptionForm";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
};

export default async function AdminElementPage({ params } : { params: { contestId: string }}) {
    
    const { contestId } = params

    const { data: contest } = await getCollectionElementById('contests', contestId)

    const { data: inscriptions } = await getCollection('inscriptions')

    if (!contest) throw new Error('No se ha encontrado el concurso en la base de datos.')

    return (
        <div className="flex flex-col justify-start items-center w-full min-h-screen bg-neutral-950">
            <section className="flex flex-col gap-2 w-full max-w-2xl">
                <header className="py-8">
                    <h1 className="uppercase">INSCRIPCIONES DE { contest.name }</h1>
                </header>
                <CreateInscriptionForm contest={ contest } />
                {
                    inscriptions?.map((inscription, index) => {
                        
                        console.log({ media: inscription.Medium })

                        return <div 
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
                    })
                }
            </section>

        </div>
    )
}
