import { Metadata } from "next";
import { getInscriptionById } from "@/lib/fetch/get/inscriptions";
import EditInscriptionModule from "./_components/EditInscriptionModule";

export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
};

const getData = async ({ id } : { id: string }) => {

    const data = await getInscriptionById(id)

    return data

}

export default async function InscriptionAdminPage({ params } : { params: { id: string, inscriptionId: string }}) {

    const { inscriptionId: id } = params

    const { data: inscription } = await getData({ id }) 

    if (!inscription) throw new Error('No inscription found.')

    return (
        <div>
            <h1>{ inscription.name }</h1>
            <EditInscriptionModule inscription={ inscription }/>
        </div>
    )
}
