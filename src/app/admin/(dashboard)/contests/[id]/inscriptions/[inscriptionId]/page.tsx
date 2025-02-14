import { Metadata } from "next";
import EditInscriptionModule from "./_components/EditInscriptionModule";
import { getInscriptionFromDatabase } from "./_functions";
import { Inscription } from "@/types/inscriptions";

export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
};

const getInscriptionPageData = async ({ inscriptionId } : { inscriptionId: string }) : Promise<Inscription> => {

    const inscription = await getInscriptionFromDatabase({ id: inscriptionId, scope: 'detailed' }) 

    return JSON.parse(JSON.stringify(inscription))
}

export default async function InscriptionAdminPage({ params } : { params: { id: string, inscriptionId: string }}) {

    const { inscriptionId, id } = params

    const inscription = await getInscriptionPageData({ inscriptionId })

    return (
        <div>
            <h1>{ inscription.name }</h1>
            <EditInscriptionModule inscription={ inscription }/>
        </div>
    )
}
