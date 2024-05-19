import { Metadata } from "next";
import Dashboard from "./_dashboard/Dashboard";
import { getAdminData } from "../_fetch/get";
import { IAdminData } from "@/types/admin";
import { IAPIError, IAPIResponse } from "@/types/api";

export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
};

const getData = async () : Promise<IAPIResponse<IAdminData>> => {
    
    const res = await getAdminData()

    if (res.error) throw new Error(res.error.message)
    
    return res
} 

export default async function AdminHome() {

    const { data } = await getData() as { data: IAdminData }

    return (
        <main className="min-h-screen w-full pt-20 bg-gradient-to-tl from-neutral-900 to-neutral-800">
            <Dashboard data={ data }/>
        </main>
    )
}
