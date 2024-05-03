import { Metadata } from "next";
import { getCollection } from "../_fetch/get";
import Panel from "./_panel/Panel";

export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
  };

export default async function AdminHome() {

    const { data: contests } = await getCollection('contests')
    const { data: brands } = await getCollection('brands')

    return (
        <main className="flex min-h-screen flex-col">
            <Panel contests={ contests } brands={ brands }/>
        </main>
    )
}
