import { Metadata } from "next";
import Link from "next/link"
import { getCollection } from "../_fetch/get";
import { IBrand } from "@/interfaces";

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
    },
    {
        name: 'base de datos',
        href: '/admin/database'
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
        <main className="flex min-h-screen flex-col">
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
            <section className="py-8">
                <div className="flex flex-col items-center max-w-xl mx-auto gap-4">
                <h2>CONTESTS</h2>
                {
                    contests.map((contest: any, index: number) => {
                        return (
                            <div key={ index } className="flex text-white border-white bg-stone-950 border px-8 py-4 rounded-md w-full">
                                <div className="flex flex-col justify-center flex-1">
                                    <header className="uppercase text-left font-bold">
                                        { contest.name } ({ contest.year })
                                    </header>
                                    <p className=" text-sm">{ contest.domain.replace('-', '.') }</p>
                                </div>
                                <div className="flex items-center">
                                    <Link 
                                        className="bg-stone-200 text-stone-800 px-4 py-1 rounded-sm font-bold"
                                        href={ `/admin/contests/${contest.id}` }
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
            <section>
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
                                        className="bg-stone-200 text-stone-800 px-4 py-1 rounded-sm font-bold"
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
