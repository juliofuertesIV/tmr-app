import { Metadata } from "next";
import Dashboard from "./_dashboard/Dashboard";
import { getDashboardData } from "../_fetch/get";
import { IAdminData } from "@/types/admin";
import { IAPIResponse } from "@/types/api";
import { decryptJWT } from "@/auth";
import { cookies } from "next/headers";

export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
};

const getData = async () : Promise<IAPIResponse<IAdminData>> => {
    
    const res = await getDashboardData()

    if (res.error) throw new Error(res.error.message)
    
    const currentSession = cookies().get('session')

    const manager = currentSession ? await decryptJWT(currentSession?.value) : null

    return res
} 

export default async function AdminHome() {

    const { data } = await getData() as { data: IAdminData }   

    return (
        <main className="min-h-screen w-full pt-20 bg-neutral-950">
            <Dashboard data={ data }/>
        </main>
    )
}
