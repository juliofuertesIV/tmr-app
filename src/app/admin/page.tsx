import { Metadata } from "next";
import Link from "next/link"
import { getCollection } from "../_fetch/get";
import { IBrand, IContest } from "@/interfaces";
import AdminLoader from "./_layout/AdminLoader";

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
        <main className="flex min-h-screen flex-col">
            <header className="flex py-8 justify-center">
                <h1>ADMIN PANEL</h1>
            </header>
            <div className="flex flex-col gap-4">
            <section className="p-12 pt-4 w-full max-w-5xl mx-auto bg-neutral-900">
                <header className="w-full py-4 mb-4">
                    <h2>CONTESTS</h2>
                </header>
                <div className="flex flex-wrap gap-4 items-center mx-auto">
                {
                    contests.map((contest: IContest, index: number) => {
                        return (
                            <div 
                                key={ index } 
                                className="flex gap-8 text-white border-white bg-neutral-800 border px-8 py-4 rounded-md w-full max-w-fit "
                                style={{
                                    backgroundColor: contest.Brand?.backgroundColor || '',
                                    color: contest.Brand?.foregroundColor || ''
                                }}
                            >
                                <div className="flex flex-col justify-center flex-1">
                                    <header className="uppercase text-left font-bold leading-none">
                                        { contest.name } ({`${ contest.Brand?.name || "No branding"}, ${ contest.year }`})
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
                                        className="bg-neutral-200 text-neutral-800 px-4 py-1 rounded-sm font-bold leading-none hover:bg-neutral-50"
                                        href={ `/admin/contests/${contest.id}` }
                                    >
                                        MANAGE
                                    </Link>
                                    <Link 
                                        className="bg-neutral-200 text-neutral-800 px-4 py-1 rounded-sm font-bold leading-none hover:bg-neutral-50 pointer-events-none opacity-50"
                                        href={ `/admin/contests/${contest.id}/stats` }
                                    >
                                        STATS
                                    </Link>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
            </section>
            <section className="p-12 pt-4 w-full max-w-5xl mx-auto bg-neutral-900">
                <header className="w-full py-4 mb-4">
                    <h2>BRANDS</h2>
                </header>
                <div className="grid xl:grid-cols-4 grid-cols-2 items-center w-full mx-auto gap-4">
                {
                    brands.map((brand: IBrand, index: number) => {
                        return (
                            <div 
                                key={ index }
                                className="flex items-start border p-4 rounded-md aspect-square max-w-sm relative group cursor-pointer"
                                style={{
                                    backgroundColor: brand.backgroundColor,
                                    color: brand.foregroundColor
                                }}
                            >
                                <div className="flex flex-col justify-center flex-1">
                                    <header className="text-left pt-2">
                                        <h4 className="uppercase font-bold leading-none">{ brand.name }</h4>
                                        <Link 
                                            className="hover:underline"
                                            target="_blank"
                                            href={ brand.website }
                                        >
                                            <small>{ brand.website }</small>
                                        </Link>
                                    </header>
                                </div>
                                <div className="flex items-center absolute top-1 right-2 group-hover:animate-pulse">
                                    <Link 
                                        className="font-bold"
                                        style={{
                                            color: brand.accentColor
                                        }}
                                        href={ `/admin/brands/${brand.id}` }
                                    >
                                        EDIT
                                    </Link>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
            </section>
            </div>
        </main>
    )
}
