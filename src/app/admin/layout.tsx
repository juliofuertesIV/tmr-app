import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import AdminMainNav from "./_layout/nav/AdminMainNav";
import { cookies } from "next/headers";
import { decryptJWT } from "@/lib/auth";
import { redirect } from "next/navigation";
import { IManager } from "@/types";
import { getCollectionElementById } from "@/lib/fetch/get";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "TMR Concurso Folleti",
    description: "Esta es la página genérica de los concursos de TMR FOR LIFE",
};


async function getManagerById() {
    const id = await getManagerIdBySession()

    if (!id) throw new Error('No manager id found.')

    const { data: manager } = await getCollectionElementById('managers', id)

    return manager
    
}

async function getManagerIdBySession() : Promise<string | null> {

    const currentSession = cookies().get('session');
    
    const manager = currentSession ? 
        await decryptJWT(currentSession?.value).then(data => data) 
        : null;

    return manager?.id || null;
}


export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

    const manager = await getManagerById() as IManager | null;

    if (!manager) { 
        return redirect('/login') 
    }

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

