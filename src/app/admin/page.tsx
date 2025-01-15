import { Metadata } from "next";
import ContestsDashboard from "./_dashboard/ContestsDashboard";
import { getDashboardData } from "../../lib/fetch/get";
import { IDashboardData } from "@/types/admin";
import { IAPIResponse } from "@/types/api";

export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
};

const getData = async () : Promise<IAPIResponse<IDashboardData>> => {
    
    const res = await getDashboardData()
    if (res.error) throw new Error(res.error.message)
    
    return res
} 

export default async function AdminHome() {
    
    const { data } = await getData() as { data: IDashboardData }
    const { contests } = data

    return (
        <main className="min-h-screen w-full">
            <ContestsDashboard contests={ contests }/>
        </main>
    )
}
