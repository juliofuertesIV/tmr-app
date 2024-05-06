import { Metadata } from "next";
import Dashboard from "./_dashboard/Dashboard";

export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
  };

export default async function AdminHome() {

    return (
        <main className="flex min-h-screen flex-col">
            <h1>Admin Panel</h1>
            <Dashboard/>
        </main>
    )
}
