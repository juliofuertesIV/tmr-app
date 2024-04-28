import { Metadata } from "next";
import { IOneOfCollectionNames } from "@/interfaces";
import AdminEditionForm from "../../_forms/AdminEditionForm";
import { getEditionFormByCollectionName } from "../../_forms";
import { getCollectionElementById } from "@/app/_fetch/get";
import ContestExtras from "../../_forms/contests/ContestExtras";

export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
};

export default async function AdminElementPage({ params } : { params: { collection: IOneOfCollectionNames, id: string }}) {
    
    const { collection, id } = params

    const { data: item } = await getCollectionElementById(collection, id)

    const { action, fields } = getEditionFormByCollectionName({ collection })

    return (
        <main className="flex min-h-screen flex-col">
            <header className="flex py-8 justify-center">
                <h1 className="uppercase">{ collection }</h1>
            </header>
            <div className="w-full max-w-xl mx-auto">
                <h2 className="uppercase my-4">EDITAR { item.name }</h2>
                {
                    collection === 'contests' && 
                    <>
                        <ContestExtras contest={ item }/>
                        <hr className=" my-8"></hr>
                    </>    
                }
                <AdminEditionForm action={ action } fields={ fields } collection={ collection } item={ item }/>
            </div>
        </main>
    )
}
