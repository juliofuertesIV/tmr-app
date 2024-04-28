import { Metadata } from "next";
import { getCollection } from "../_fetch/get";
import ContestGrid from "./_contests/ContestGrid";
import BrandGrid from "./_brands/BrandGrid";

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
            <div className="flex flex-col gap-4">
            <section className="w-full max-w-5xl mx-auto bg-gradient-to-tr from-neutral-900 to-neutral-800 rounded-xl overflow-hidden">
                <header className="flex justify-between w-full py-4 mb-8 bg-neutral-700 pt-4 px-8">
                    <h2>GESTIÓN DE CONCURSOS</h2>
                    <button className="bg-neutral-500 text-neutral-100 font-bold hover:bg-neutral-600 hover:text-neutral-50 px-4 rounded-md text-sm transition-colors shadow-md">
                        ADD NEW
                    </button>
                </header>
                <div className="px-8 pb-8">
                    <ContestGrid contests={ contests }/>
                </div>
            </section>
            <section className="w-full max-w-5xl mx-auto bg-gradient-to-tr from-neutral-900 to-neutral-800 rounded-xl overflow-hidden">
                <header className="flex justify-between w-full py-4 mb-8 bg-neutral-700 pt-4 px-8">
                    <h2>GESTIÓN DE MARCAS</h2>
                    <button className="bg-neutral-500 text-neutral-100 font-bold hover:bg-neutral-600 hover:text-neutral-50 px-4 rounded-md text-sm transition-colors shadow-md">
                        ADD NEW
                    </button>
                </header>
                <div className="px-8 pb-8">
                    <BrandGrid brands={ brands }/>
                </div>
            </section>
            </div>
        </main>
    )
}
