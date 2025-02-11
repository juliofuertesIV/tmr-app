import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../globals.css";
import AdminMainNav from "../_layout/nav/AdminMainNav";
import { getLayoutData } from "./_functions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "TMR Concurso Folleti",
    description: "Esta es la página genérica de los concursos de TMR FOR LIFE",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

    const manager = await getLayoutData()
    
    return (
        <html lang="en">
            <body className={ inter.className }>
                <main className="admin-page-main flex bg-neutral-950">
                    <AdminMainNav manager={ manager }/>
                    { children }
                </main>
            </body>
        </html>
    );
}

