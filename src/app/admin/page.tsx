import { Metadata } from "next";
import Link from "next/link"
import { getContests } from "../_fetch/get";

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

    const { data: contests } = await getContests()

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
                {
                    contests.map((contest: any, index: number) => {
                        return (
                            <div key={ index } className="flex text-white border-white border px-8 py-4 rounded-md w-full">
                                <div className="flex flex-col justify-center flex-1">
                                    <header className="uppercase text-left font-bold">
                                        { contest.name } ({ contest.year })
                                    </header>
                                    <p className=" text-sm">{ contest.domain.replace('-', '.') }</p>
                                </div>
                                <div className="flex items-center">
                                    <Link 
                                        className="bg-stone-200 text-stone-800 px-4 py-1 rounded-sm"
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
        </main>
    )
}
