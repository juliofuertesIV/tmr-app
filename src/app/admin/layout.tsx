import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import AdminMainNav from "./_layout/nav/AdminMainNav";
import { getSession } from "@/lib/auth";
import { FindOptions } from "sequelize";
import { Manager, ManagerRoleId } from "@/types";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "TMR Concurso Folleti",
    description: "Esta es la página genérica de los concursos de TMR FOR LIFE",
};


async function getManager() {

    const managerOptions : FindOptions = {
        attributes: ['id', 'name', 'email', 'RoleId'],
    }

    const decryptedManager = await getSession().then(data => data)

/*     .then(async (data) => {

        if (!data) return redirect('/login')

        return await Manager.findOne({ ...managerOptions, where: { id: data.id }}).then(data => data)
    })
    .catch(error => {
        throw new Error(error as string)
    })
 */
    return decryptedManager
    
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

    const manager = await getManager() as unknown as Manager
    
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

