import { Metadata } from "next";
import { getCollection } from "../_fetch/get";
import Dashboard from "./_dashboard/Dashboard";

export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
  };

export default async function AdminHome() {

    const { data: contests } = await getCollection('contests')
    const { data: brands } = await getCollection('brands')

    return (
        <main className="flex min-h-screen flex-col">
            <h1>Admin Panel</h1>
            <Dashboard contests={ contests } brands={ brands }/>
        </main>
    )
}
