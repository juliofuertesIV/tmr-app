import { Metadata } from "next";
import ContestsDashboard from "./_components/ContestsDashboard";
import { getDashboardPageData } from "./_functions";

export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
};


export default async function AdminHome() {
 
    const contests = await getDashboardPageData()
    
    return (
        <main className="min-h-screen w-full">
            <ContestsDashboard contests={ contests }/>
        </main>
    )
}
