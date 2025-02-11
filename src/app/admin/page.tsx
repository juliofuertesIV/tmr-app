import { Metadata } from "next";
import ContestsDashboard from "./_dashboard/ContestsDashboard";
import { getAllContestsFromDatabase } from "@/lib/database/functions/contests";

export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
};

const getData = async () => {

    const contests = await getAllContestsFromDatabase({ scope: 'basic' })
    .then(data => JSON.parse(JSON.stringify(data)))
    .catch(error => { throw new Error(error as string)})

    return contests
}

export default async function AdminHome() {
    
    const contests = await getData()

    return (
        <main className="min-h-screen w-full">
            <ContestsDashboard contests={ contests }/>
        </main>
    )
}
