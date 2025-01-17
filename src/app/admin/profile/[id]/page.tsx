import { getCollectionElementById } from "@/lib/fetch/get";
import { IManager } from "@/types";
import { Metadata } from "next";
import Header from "../_components/Header";
import ProfileEditionModule from "../_components/ProfileEditionModule";

export const metadata: Metadata = {
    title: "Panel de administración TMR | Perfil",
    description: "El buen admin panel"
};

const getData = async ({ id } : { id: string }) => {

    const { data: manager } = await getCollectionElementById("managers", id) as { data: IManager }

    if (!manager) throw new Error('No manager found with this id.')

    return manager
}

export default async function ProfilePage({ params } : { params: { id: string }}) {

    const { id } = params

    const manager = await getData({ id })
    
    return (
        <section className="admin-page-content">
            <Header manager={ manager }/>
            <ProfileEditionModule manager={ manager }/>
        </section>
    )
}
