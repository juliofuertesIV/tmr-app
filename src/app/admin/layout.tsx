import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import AdminMainNav from "./_layout/AdminMainNav";
import { cookies } from "next/headers";
import { decryptJWT } from "@/auth";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "TMR Concurso Folleti",
    description: "Esta es la página genérica de los concursos de TMR FOR LIFE",
};


async function getManagerSession() {

    const currentSession = cookies().get('session');
    
    const manager = currentSession ? await decryptJWT(currentSession?.value) : null;

    return manager;
}


export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

    const manager = await getManagerSession();

    if (!manager) {
        redirect('/login')
    }

    return (
        <html lang="en">
            <body className={ inter.className }>
                <main className="flex">
                    <AdminMainNav manager={ manager }/>
                    { children }
                </main>
            </body>
        </html>
    );
}

