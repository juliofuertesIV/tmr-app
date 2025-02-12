import { Metadata } from "next";
import { getInscriptionById } from "@/lib/fetch/get/inscriptions";
import EditInscriptionModule from "./_components/EditInscriptionModule";
import { getInscriptionFromDatabase } from "./_functions";

export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
};

export default async function InscriptionAdminPage({ params } : { params: { id: string, inscriptionId: string }}) {

    const { inscriptionId: id } = params

    const inscription = await getInscriptionFromDatabase({ id }) 

    if (!inscription) throw new Error('No inscription found.')

    return (
        <div>
            <h1>{ inscription.name }</h1>
            <EditInscriptionModule inscription={ inscription }/>
        </div>
    )
}
