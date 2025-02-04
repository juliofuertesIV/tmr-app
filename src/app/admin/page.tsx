import { Metadata } from "next";
import ContestsDashboard from "./_dashboard/ContestsDashboard";
import { IAPIResponse } from "@/types/api";
import { getContests } from "@/lib/fetch/get/contests";
import { IContest } from "@/types";

export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
};

const getData = async () : Promise<IAPIResponse<IContest[]>> => {
    
    const res = await getContests()

    return res
    
} 

export default async function AdminHome() {
    
    const { data: contests } = await getData()

    if (!contests) throw new Error('Error fetching contests!')

    return (
        <main className="min-h-screen w-full">
            <ContestsDashboard contests={ contests }/>
        </main>
    )
}
