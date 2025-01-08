import { getCollectionElementById } from "@/lib/fetch/get";
import { IManager } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Panel de administración TMR | Perfil",
    description: "El buen admin panel"
};

export default async function ProfilePage({ params } : { params: { id: string }}) {

    const { id } = params

    const { data: manager } = await getCollectionElementById("managers", id) as { data: IManager }

    return (
        <section className="admin-page-content">
            <h1>{ manager.name }</h1>
            <p className="italic uppercase text-sm">{ manager.Role.name }</p>
            <p>{ manager.email }</p>
        </section>
    )
}
