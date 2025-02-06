import { Metadata } from "next";
import { getInscriptionByIdAndContestId } from "@/lib/fetch/get/inscriptions";

export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
};

const getData = async ({ contestId, id } : { contestId: string, id: string }) => {

    const data = await getInscriptionByIdAndContestId(contestId, id)

    return data

}

export default async function InscriptionAdminPage({ params } : { params: { id: string, inscriptionId: string }}) {

    const { id: contestId, inscriptionId: id } = params

    const { data: inscription } = await getData({ contestId, id }) 

    if (!inscription) throw new Error('No inscription found.')

    return (
        <div>
            <h1>{ inscription.name }</h1>
        </div>
    )
}
