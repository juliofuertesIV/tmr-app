import { Metadata } from "next";
import Link from "next/link"
import { getCollection } from "../_fetch/get";
import { IBrand, IContest } from "@/interfaces";

const adminMenuElements = [
    {
        name: 'concursos',
        href: '/admin/contests'
    },
    {
        name: 'marcas',
        href: '/admin/brands'
    },
    {
        name: 'usuarios',
        href: '/admin/users'
    }
]

export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
  };

export default async function Home() {

    const { data: contests } = await getCollection('contests')
    const { data: brands } = await getCollection('brands')

    return (
        <main className="flex min-h-screen flex-col gap-4">
            <header className="flex py-8 justify-center">
                <h1>ADMIN PANEL</h1>
            </header>
            <menu className="flex justify-center gap-4">
                {
                    adminMenuElements.map((element, index) => {
                        return (
                            <Link key={ index } href={ element.href }>
                                <li className="px-4 py-1 uppercase">
                                    { element.name }
                                </li>
                            </Link>
                        )
                    })
                }
            </menu>
            <section className="py-8 border border-white w-full max-w-4xl mx-auto bg-neutral-950">
                <div className="flex flex-col items-center max-w-xl mx-auto gap-4">
                <h2>CONTESTS</h2>
                {
                    contests.map((contest: IContest, index: number) => {
                        return (
                            <div key={ index } className="flex text-white border-white bg-neutral-900 border px-8 py-4 rounded-md w-full">
                                <div className="flex flex-col justify-center flex-1">
                                    <header className="uppercase text-left font-bold leading-none">
                                        { contest.name } ({ contest.year })
                                    </header>
                                    <div className="opacity-70 pb-2">
                                        <small>{ contest.metaUrl }</small>
                                    </div>
                                    <div className="uppercase font-bold opacity-70 leading-none">
                                        <small>ESTADO: { contest.State.name }</small>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center gap-2 text-center text-sm">
                                    <Link 
                                        className="bg-neutral-200 text-neutral-800 px-4 py-1 rounded-sm font-bold"
                                        href={ `/admin/contests/${contest.id}` }
                                    >
                                        EDITAR
                                    </Link>
                                    <Link 
                                        className="bg-neutral-200 text-neutral-800 px-4 py-1 rounded-sm font-bold"
                                        href={ `/admin/contests/${contest.id}` }
                                    >
                                        ESTADÍSTICAS
                                    </Link>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
            </section>
            <section className="py-8 border border-white w-full max-w-4xl mx-auto bg-neutral-950">
                <div className="flex flex-col items-center max-w-xl mx-auto gap-4">
                <h2>BRANDS</h2>
                {
                    brands.map((brand: IBrand, index: number) => {
                        return (
                            <div 
                                key={ index }
                                className={`flex border px-8 py-4 rounded-md w-full`}
                                style={{
                                    backgroundColor: brand.backgroundColor,
                                    color: brand.foregroundColor
                                }}
                            >
                                <div className="flex flex-col justify-center flex-1">
                                    <header className="text-left pt-2">
                                        <h4 className="uppercase font-bold leading-none">{ brand.name }</h4>
                                        <Link target="_blank" href={ brand.website }><small>{ brand.website }</small></Link>
                                    </header>
                                </div>
                                <div className="flex items-center">
                                    <Link 
                                        className="px-4 py-1 rounded-sm font-bold"
                                        style={{
                                            backgroundColor: brand.accentColor,
                                            color: brand.backgroundColor
                                        }}
                                        href={ `/admin/brands/${brand.id}` }
                                    >
                                        EDITAR
                                    </Link>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
            </section>
        </main>
    )
}
