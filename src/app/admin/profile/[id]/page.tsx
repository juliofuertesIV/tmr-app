import { getCollectionElementById } from "@/lib/fetch/get";
import { IManager } from "@/types";
import { Metadata } from "next";
import Header from "../_components/Header";
import ProfileEditionModule from "../_components/ProfileEditionModule";

export const metadata: Metadata = {
    title: "Panel de administración TMR | Perfil",
    description: "El buen admin panel"
};

export default async function ProfilePage({ params } : { params: { id: string }}) {

    const { id } = params

    const { data: manager } = await getCollectionElementById("managers", id) as { data: IManager }

    return (
        <section className="admin-page-content">
            <Header manager={ manager }/>
            <ProfileEditionModule manager={ manager }/>
        </section>
    )
}
