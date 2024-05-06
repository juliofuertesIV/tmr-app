import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import AdminDataProvider, { IAdminData } from "@/_providers/AdminDataProvider";
import { getAdminData } from "../_fetch/get";

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
                    { children }
                </AdminDataProvider>
            </body>
        </html>
    );
}
