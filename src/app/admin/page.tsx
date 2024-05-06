import { Metadata } from "next";
import Dashboard from "./_dashboard/Dashboard";
import { getAdminData } from "../_fetch/get";
import { IAdminData } from "@/_providers/AdminDataProvider";

export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
};

const getData = async () : Promise<IAdminData> => {
    const { data } : { data: IAdminData } = await getAdminData()
    return data 
} 

export default async function AdminHome() {

    const data = await getData()

    return (
        <main className="min-h-screen w-full pt-20 bg-gradient-to-tl from-neutral-900 to-neutral-800">
            <Dashboard data={ data }/>
        </main>
    )
}
