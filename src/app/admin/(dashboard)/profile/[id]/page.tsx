import { Metadata } from "next";
import Header from "../_components/Header";
import ProfileEditionModule from "../_components/ProfileEditionModule";
import ContestList from "../_components/ContestList";
import { getProfilePageData } from "./_functions";

export const metadata: Metadata = {
    title: "Panel de administración TMR | Perfil",
    description: "El buen admin panel"
};

export default async function ProfilePage({ params } : { params: { id: string }}) {

    const { id } = params

    const manager = await getProfilePageData({ id })
    
    return (
        <section className="admin-page-content">
            <Header manager={ manager }/>
            <ProfileEditionModule manager={ manager }/>
            <ContestList manager={ manager }/>
        </section>
    )
}
