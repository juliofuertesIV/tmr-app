import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import AdminDataProvider, { IAdminData } from "@/_providers/AdminDataProvider";
import { getAdminData } from "../_fetch/get";
import Link from "next/link";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "TMR Concurso Folleti",
    description: "Esta es la página genérica de los concursos de TMR FOR LIFE",
};

const getData = async () : Promise<IAdminData> => {
    const { data } = await getAdminData()
    return data 
} 

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

    const data = await getData()

    return (
        <html lang="en">
            <body className={ inter.className }>
                <AdminDataProvider data={ data }>
                    <main className="grid grid-flow-col grid-cols-12">
                        <nav className=" text-white xl:col-span-1 col-span-2 flex flex-col px-2 bg-neutral-900">
                            <Image 
                                className="w-full max-w-full my-4"
                                src={ '/img/tmr_logo.png' }
                                alt='TMR Logo'
                                width={ 300 }
                                height={ 36 }
                            />
                            <menu className="flex flex-col uppercase text-sm gap-2">
                                <Link className="border border-neutral-800 px-2 py-1 rounded-sm hover:bg-neutral-800" href={ '/admin/contests' }>
                                    Concursos
                                </Link>
                                <Link className="border border-neutral-800 px-2 py-1 rounded-sm hover:bg-neutral-800" href={ '/admin/brands' }>
                                    Marcas
                                </Link>
                                <Link className="border border-neutral-800 px-2 py-1 rounded-sm hover:bg-neutral-800" href={ '/admin/brands' }>
                                    Redes sociales
                                </Link>
                                <Link className="border border-neutral-800 px-2 py-1 rounded-sm hover:bg-neutral-800" href={ '/admin/brands' }>
                                    Usuarios
                                </Link>
                            </menu>
                        </nav>
                        <section className="w-full col-span-11">
                            { children }
                        </section>
                    </main>
                </AdminDataProvider>
            </body>
        </html>
    );
}
