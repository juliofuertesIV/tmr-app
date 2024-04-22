import { Metadata } from "next";
import Link from "next/link"

const adminMenuElements = [
    {
        name: 'concursos',
        href: '/admin/contests'
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

export default function Home() {
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
        </main>
    )
}
