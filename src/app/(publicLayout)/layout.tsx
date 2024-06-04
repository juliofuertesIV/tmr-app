import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '../globals.css'
import MetaPixel from "@/lib/tracking/MetaPixel";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TMR Concurso Folleti",
  description: "Esta es la página genérica de los concursos de TMR FOR LIFE",
};

export default function RootLayout({
    children,
    }: Readonly<{
        children: React.ReactNode;
    }>) {
    return (
        <html lang="en">
            <body className={ inter.className }>
                { children }
            </body>
            <MetaPixel/>
        </html>
    );
}
