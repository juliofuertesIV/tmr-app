import { Metadata } from "next";
import Header from "../_components/Header";
import ProfileEditionModule from "../_components/ProfileEditionModule";
import ContestList from "../_components/ContestList";
import { getManagerFromDatabaseById } from "@/lib/database/functions/managers";

export const metadata: Metadata = {
    title: "Panel de administración TMR | Perfil",
    description: "El buen admin panel"
};

const getData = async ({ id } : { id: string }) => {

    const manager = await getManagerFromDatabaseById({ id, scope: 'detailed' })
    .then(data => JSON.parse(JSON.stringify(data)))
    .catch(error => { throw new Error(error as string) })

    return manager
}

export default async function ProfilePage({ params } : { params: { id: string }}) {

    const { id } = params

    const manager = await getData({ id })
    
    return (
        <section className="admin-page-content">
            <Header manager={ manager }/>
            <ProfileEditionModule manager={ manager }/>
            <ContestList manager={ manager }/>
        </section>
    )
}
