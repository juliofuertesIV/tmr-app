import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import AdminProvider from "@/_providers/AdminProvider";
import { IBrand, IContest, IContestState, IParam } from "@/interfaces";
import { getAdminData } from "../_fetch/get";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "TMR Concurso Folleti",
    description: "Esta es la página genérica de los concursos de TMR FOR LIFE",
};

export type AdminData = {
    contests: IContest[],
    brands: IBrand[],
    params: IParam[],
    states: IContestState[]
}

const getData = async () : Promise<AdminData> => {
    const { data } = await getAdminData()
    return data 
} 

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

    const data = await getData()

    return (
        <html lang="en">
            <body className={ inter.className }>
                <AdminProvider data={ data }>
                    { children }
                </AdminProvider>
            </body>
        </html>
    );
}
