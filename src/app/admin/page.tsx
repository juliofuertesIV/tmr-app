import { Metadata } from "next";
import ContestsDashboard from "./_dashboard/ContestsDashboard";
import { getContests } from "@/lib/fetch/get/contests";

export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
};

export default async function AdminHome() {
    
    const { data: contests } = await getContests()

    return (
        <main className="min-h-screen w-full">
            {
                !!contests ? <ContestsDashboard contests={ contests }/> : "No contests found."
            }
        </main>
    )
}
