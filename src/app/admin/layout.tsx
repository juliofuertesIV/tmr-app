import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

import Nav from "./_layout/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "TMR Concurso Folleti",
    description: "Esta es la página genérica de los concursos de TMR FOR LIFE",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

    return (
        <html lang="en">
            <body className={ inter.className }>
                <main className="flex">
                    <Nav/>
                    <section className="w-full">
                        { children }
                    </section>
                </main>
            </body>
        </html>
    );
}
