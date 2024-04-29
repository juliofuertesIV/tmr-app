import { Metadata } from "next";
import { getCollection } from "../_fetch/get";
import Panel from "./_panel/Panel";

export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
  };

export default async function Home() {

    const { data: contests } = await getCollection('contests')
    const { data: brands } = await getCollection('brands')

    return (
        <main className="flex min-h-screen flex-col">
            <header className="flex py-8 justify-center">
            </header>
            <Panel contests={ contests } brands={ brands }/>
        </main>
    )
}
