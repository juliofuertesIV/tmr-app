import { Metadata } from "next";
import ContestsDashboard from "./_dashboard/ContestsDashboard";
import { getDashboardData } from "../../lib/fetch/get";
import { IAdminData } from "@/types/admin";
import { IAPIResponse } from "@/types/api";
import { sequelize, testDatabaseConnection } from "@/lib/database";

export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
};

const getData = async () : Promise<IAPIResponse<IAdminData>> => {

    await testDatabaseConnection()
    
    await sequelize.sync()

    const res = await getDashboardData()

    if (res.error) throw new Error(res.error.message)
    
    return res
} 

export default async function AdminHome() {
    
    const { data } = await getData() as { data: IAdminData }
    const { contests } = data

    return (
        <main className="min-h-screen w-full pt-20 bg-neutral-950">
            <ContestsDashboard contests={ contests }/>
        </main>
    )
}
